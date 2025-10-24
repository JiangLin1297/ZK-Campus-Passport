// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GPAVerifier.sol";

/**
 * @title ZK Campus Passport
 * @dev 基于零知识证明的校园护照系统，保护学生隐私的同时验证学术成就
 */
contract ZKCampusPassport {
    Groth16Verifier public immutable gpaVerifier;
    
    struct StudentRecord {
        bool isRegistered;
        uint256 commitmentHash;  // GPA承诺值
        uint256 lastVerified;    // 最后验证时间
        uint256 verificationCount; // 验证次数
    }
    
    struct GPARequirement {
        uint256 minGPA;  // 最低GPA要求 (乘以100)
        uint256 maxGPA;  // 最高GPA限制 (乘以100)
        bool isActive;
        string description;
    }
    
    mapping(address => StudentRecord) public students;
    mapping(bytes32 => GPARequirement) public requirements;
    mapping(address => mapping(bytes32 => bool)) public verifiedRequirements;
    
    event StudentRegistered(address indexed student, uint256 commitmentHash);
    event GPAVerified(address indexed student, bytes32 indexed requirementId, uint256 timestamp);
    event RequirementCreated(bytes32 indexed requirementId, uint256 minGPA, uint256 maxGPA);
    
    modifier onlyRegistered() {
        require(students[msg.sender].isRegistered, "Student not registered");
        _;
    }
    
    constructor(address _gpaVerifier) {
        gpaVerifier = Groth16Verifier(_gpaVerifier);
    }
    
    /**
     * @dev 注册学生，提交GPA承诺
     * @param commitmentHash GPA承诺哈希值
     */
    function registerStudent(uint256 commitmentHash) external {
        require(!students[msg.sender].isRegistered, "Student already registered");
        require(commitmentHash > 0, "Invalid commitment hash");
        
        students[msg.sender] = StudentRecord({
            isRegistered: true,
            commitmentHash: commitmentHash,
            lastVerified: block.timestamp,
            verificationCount: 0
        });
        
        emit StudentRegistered(msg.sender, commitmentHash);
    }
    
    /**
     * @dev 创建GPA要求
     * @param requirementId 要求ID
     * @param minGPA 最低GPA (乘以100)
     * @param maxGPA 最高GPA (乘以100)
     * @param description 要求描述
     */
    function createRequirement(
        bytes32 requirementId,
        uint256 minGPA,
        uint256 maxGPA,
        string memory description
    ) external {
        require(minGPA <= maxGPA, "Invalid GPA range");
        require(maxGPA <= 400, "Max GPA cannot exceed 4.0");
        require(!requirements[requirementId].isActive, "Requirement already exists");
        
        requirements[requirementId] = GPARequirement({
            minGPA: minGPA,
            maxGPA: maxGPA,
            isActive: true,
            description: description
        });
        
        emit RequirementCreated(requirementId, minGPA, maxGPA);
    }
    
    /**
     * @dev 验证GPA证明
     * @param requirementId 要求ID
     * @param _pA 证明参数A
     * @param _pB 证明参数B
     * @param _pC 证明参数C
     * @param commitment 承诺值
     * @param valid 是否有效
     * @param minGPA 最低GPA
     * @param maxGPA 最高GPA
     */
    function verifyGPA(
        bytes32 requirementId,
        uint[2] memory _pA,
        uint[2][2] memory _pB,
        uint[2] memory _pC,
        uint256 commitment,
        uint256 valid,
        uint256 minGPA,
        uint256 maxGPA
    ) external onlyRegistered {
        require(requirements[requirementId].isActive, "Requirement not active");
        require(
            minGPA == requirements[requirementId].minGPA && 
            maxGPA == requirements[requirementId].maxGPA,
            "GPA range mismatch"
        );
        require(commitment == students[msg.sender].commitmentHash, "Commitment mismatch");
        require(valid == 1, "GPA verification failed");
        
        // 验证零知识证明
        uint[4] memory input = [commitment, valid, minGPA, maxGPA];
        require(
            gpaVerifier.verifyProof(_pA, _pB, _pC, input),
            "Invalid proof"
        );
        
        // 更新验证状态
        verifiedRequirements[msg.sender][requirementId] = true;
        students[msg.sender].lastVerified = block.timestamp;
        students[msg.sender].verificationCount++;
        
        emit GPAVerified(msg.sender, requirementId, block.timestamp);
    }
    
    /**
     * @dev 检查学生是否满足特定要求
     */
    function hasVerifiedRequirement(address student, bytes32 requirementId) 
        external 
        view 
        returns (bool) 
    {
        return verifiedRequirements[student][requirementId];
    }
    
    /**
     * @dev 获取学生记录
     */
    function getStudentRecord(address student) 
        external 
        view 
        returns (StudentRecord memory) 
    {
        return students[student];
    }
    
    /**
     * @dev 获取要求详情
     */
    function getRequirement(bytes32 requirementId) 
        external 
        view 
        returns (GPARequirement memory) 
    {
        return requirements[requirementId];
    }
    
    /**
     * @dev 批量验证多个要求
     */
    function batchVerifyRequirements(address student, bytes32[] memory requirementIds) 
        external 
        view 
        returns (bool[] memory results) 
    {
        results = new bool[](requirementIds.length);
        for (uint i = 0; i < requirementIds.length; i++) {
            results[i] = verifiedRequirements[student][requirementIds[i]];
        }
    }
}