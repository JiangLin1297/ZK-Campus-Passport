// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Verifier.sol"; // 引入snarkjs生成的ZK验证器

/// @title ZK-Campus Passport - GPA成就认证合约
/// @notice 基于零知识证明的校园成就存证与验证系统
contract GPAProof {
    // 自定义错误（节省gas）
    error NotAuthority();
    error InvalidProof();
    error AlreadyVerified();
    error ProofExpired();

    // 权威机构（如学校、教务处）
    address public immutable authority;

    // 成就类型枚举
    enum AchievementType {
        GPA,
        Competition,
        Volunteer,
        ClubActivity
    }

    // 成就记录结构体
    struct Achievement {
        AchievementType typ; // 成就类型
        bytes32 metadataHash; // 成就元数据哈希（如竞赛名称、时间等）
        uint256 timestamp; // 存证时间
        bool isVerified; // 是否通过ZK验证
    }

    // 学生地址 => 成就ID => 成就详情
    mapping(address => mapping(uint256 => Achievement)) public studentAchievements;
    // 学生地址 => 成就总数
    mapping(address => uint256) public studentAchievementCount;
    // 记录已验证的ZK证明（防重放）
    mapping(bytes32 => bool) public usedProofs;

    // 事件声明
    event AchievementAdded(
        address indexed student,
        uint256 indexed achievementId,
        AchievementType typ,
        bytes32 metadataHash
    );
    event ProofVerified(
        address indexed student,
        uint256 indexed achievementId,
        uint256 timestamp
    );
    event AuthorityTransferred(address indexed newAuthority);

    /// @notice 仅权威机构可调用的修饰器
    modifier onlyAuthority() {
        if (msg.sender != authority) revert NotAuthority();
        _;
    }

    /// @notice 构造函数：初始化权威机构
    constructor(address _authority) {
        require(_authority != address(0), "Invalid authority");
        authority = _authority;
    }

    /// @notice 权威机构添加学生成就（离线审核后上链）
    /// @param student 学生钱包地址
    /// @param typ 成就类型
    /// @param metadataHash 成就元数据哈希（IPFS哈希或结构化数据哈希）
    function addAchievement(
        address student,
        AchievementType typ,
        bytes32 metadataHash
    ) external onlyAuthority returns (uint256) {
        uint256 achievementId = studentAchievementCount[student];
        studentAchievements[student][achievementId] = Achievement({
            typ: typ,
            metadataHash: metadataHash,
            timestamp: block.timestamp,
            isVerified: false
        });
        studentAchievementCount[student]++;
        emit AchievementAdded(student, achievementId, typ, metadataHash);
        return achievementId;
    }

    /// @notice 学生提交ZK证明验证成就（如GPA达标）
    /// @param a ZK证明参数a
    /// @param b ZK证明参数b
    /// @param c ZK证明参数c
    /// @param input 公共输入（[threshold, gpaHash]）
    /// @param achievementId 待验证的成就ID
    function verifyAchievement(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[2] calldata input, // input[0]=阈值, input[1]=GPA哈希
        uint256 achievementId
    ) external {
        address student = msg.sender;
        Achievement storage achievement = studentAchievements[student][achievementId];
        
        // 检查成就是否存在
        require(achievement.timestamp > 0, "Achievement does not exist");
        // 检查是否已验证
        if (achievement.isVerified) revert AlreadyVerified();

        // 验证ZK证明（调用自动生成的Verifier合约）
        bool isValid = Verifier.verifyProof(a, b, c, input);
        if (!isValid) revert InvalidProof();

        // 标记证明已使用（防重放攻击）
        bytes32 proofHash = keccak256(abi.encodePacked(a, b, c, input));
        usedProofs[proofHash] = true;

        // 更新成就验证状态
        achievement.isVerified = true;
        emit ProofVerified(student, achievementId, block.timestamp);
    }

    /// @notice 查询学生的成就详情
    function getAchievement(
        address student,
        uint256 achievementId
    ) external view returns (Achievement memory) {
        return studentAchievements[student][achievementId];
    }

    /// @notice 转移权威机构权限（紧急情况使用）
    function transferAuthority(address newAuthority) external onlyAuthority {
        require(newAuthority != address(0), "Invalid new authority");
        emit AuthorityTransferred(newAuthority);
        // 注意：实际场景中可改为可升级合约实现权限转移，此处简化为事件通知
    }
}