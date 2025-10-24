import hre from "hardhat";
import { ethers } from "ethers";
import fs from 'fs';

async function main() {
    console.log("🎓 ZK Campus Passport 系统演示");
    console.log("=".repeat(50));
    
    // 创建provider和获取账户
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const owner = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const alice = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d", provider);
    const bob = new ethers.Wallet("0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a", provider);
    const charlie = new ethers.Wallet("0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a", provider);
    
    console.log("\n👥 演示参与者:");
    console.log(`   🏫 校方管理员: ${owner.address}`);
    console.log(`   👩‍🎓 学生Alice: ${alice.address}`);
    console.log(`   👨‍🎓 学生Bob: ${bob.address}`);
    console.log(`   👨‍🎓 学生Charlie: ${charlie.address}`);
    
    // 读取部署信息
    let deploymentInfo;
    try {
        deploymentInfo = JSON.parse(fs.readFileSync('deployment.json', 'utf8'));
        console.log("\n📋 系统合约地址:");
        console.log(`   🔐 GPAVerifier: ${deploymentInfo.contracts.GPAVerifier}`);
        console.log(`   🎓 ZKCampusPassport: ${deploymentInfo.contracts.ZKCampusPassport}`);
    } catch (error) {
        console.error("❌ 无法读取deployment.json，请先运行部署脚本");
        return;
    }

    // 获取合约实例
    const zkPassportArtifact = JSON.parse(fs.readFileSync('artifacts/contracts/ZKCampusPassport.sol/ZKCampusPassport.json', 'utf8'));
    const zkCampusPassport = new ethers.Contract(
        deploymentInfo.contracts.ZKCampusPassport,
        zkPassportArtifact.abi,
        owner
    );

    console.log("\n" + "=".repeat(50));
    console.log("📝 第一步: 学生注册系统");
    console.log("=".repeat(50));
    
    // 学生注册
    try {
        console.log("\n🔐 学生提交GPA承诺哈希进行注册...");
        
        // Alice使用证明中的承诺值（可以验证证明）
        const aliceCommitment = 387345;
        const tx1 = await zkCampusPassport.connect(alice).registerStudent(aliceCommitment);
        await tx1.wait();
        console.log(`✅ Alice注册成功 - 承诺哈希: ${aliceCommitment}`);
        
        // Bob和Charlie使用不同的承诺哈希
        const bobCommitment = ethers.keccak256(ethers.toUtf8Bytes("Bob_GPA_3.8"));
        const tx2 = await zkCampusPassport.connect(bob).registerStudent(bobCommitment);
        await tx2.wait();
        console.log(`✅ Bob注册成功 - 承诺哈希: ${bobCommitment}`);
        
        const charlieCommitment = ethers.keccak256(ethers.toUtf8Bytes("Charlie_GPA_2.9"));
        const tx3 = await zkCampusPassport.connect(charlie).registerStudent(charlieCommitment);
        await tx3.wait();
        console.log(`✅ Charlie注册成功 - 承诺哈希: ${charlieCommitment}`);
        
    } catch (error) {
        console.log("ℹ️  学生已注册，跳过注册步骤");
    }

    console.log("\n" + "=".repeat(50));
    console.log("📋 第二步: 创建学术要求");
    console.log("=".repeat(50));
    
    // 创建不同的GPA要求
    const requirements = [
        {
            id: "scholarship_2024",
            name: "2024年奖学金申请",
            minGPA: 300, // 3.0
            maxGPA: 400  // 4.0
        },
        {
            id: "honor_society",
            name: "荣誉学会申请",
            minGPA: 350, // 3.5
            maxGPA: 400  // 4.0
        },
        {
            id: "graduate_program",
            name: "研究生项目申请",
            minGPA: 320, // 3.2
            maxGPA: 400  // 4.0
        }
    ];

    for (const req of requirements) {
        try {
            const requirementId = ethers.keccak256(ethers.toUtf8Bytes(req.id));
            const tx = await zkCampusPassport.connect(owner).createRequirement(
                requirementId,
                req.minGPA,
                req.maxGPA,
                req.name
            );
            await tx.wait();
            console.log(`✅ 创建要求: ${req.name} (GPA: ${req.minGPA/100}-${req.maxGPA/100})`);
        } catch (error) {
            console.log(`ℹ️  要求已存在: ${req.name}`);
        }
    }

    console.log("\n" + "=".repeat(50));
    console.log("🔐 第三步: 零知识证明验证");
    console.log("=".repeat(50));
    
    // 使用现有的证明数据进行验证
    try {
        console.log("\n📄 Alice使用零知识证明验证GPA...");
        
        // 读取证明文件
        const proof = JSON.parse(fs.readFileSync('proof.json', 'utf8'));
        const publicSignals = JSON.parse(fs.readFileSync('public.json', 'utf8'));
        
        console.log("🔍 证明参数:");
        console.log(`   承诺值: ${publicSignals[0]}`);
        console.log(`   有效性: ${publicSignals[1] === '1' ? '有效' : '无效'}`);
        console.log(`   GPA范围: ${publicSignals[2]/100} - ${publicSignals[3]/100}`);
        
        // 准备证明参数
        const pA = [proof.pi_a[0], proof.pi_a[1]];
        const pB = [[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]];
        const pC = [proof.pi_c[0], proof.pi_c[1]];
        
        const commitment = publicSignals[0];
        const valid = publicSignals[1];
        const minGPA = publicSignals[2];
        const maxGPA = publicSignals[3];
        
        // 验证奖学金申请
        const scholarshipId = ethers.keccak256(ethers.toUtf8Bytes("scholarship_2024"));
        const tx = await zkCampusPassport.connect(alice).verifyGPA(
            scholarshipId,
            pA,
            pB,
            pC,
            commitment,
            valid,
            minGPA,
            maxGPA
        );
        await tx.wait();
        console.log("✅ Alice的GPA证明验证成功！");
        
    } catch (error) {
        if (error.message.includes("ENOENT")) {
            console.log("⚠️  未找到证明文件，请先运行 'node scripts/generate_proof.js'");
        } else {
            console.log("ℹ️  证明已验证或验证失败:", error.message.split('(')[0]);
        }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 第四步: 查询验证状态");
    console.log("=".repeat(50));
    
    // 查询所有学生的验证状态
    const students = [
        { name: "Alice", wallet: alice },
        { name: "Bob", wallet: bob },
        { name: "Charlie", wallet: charlie }
    ];
    
    for (const student of students) {
        console.log(`\n👤 ${student.name} (${student.wallet.address}):`);
        
        try {
            // 获取学生记录
            const record = await zkCampusPassport.getStudentRecord(student.wallet.address);
            console.log(`   📝 注册状态: ${record.isRegistered ? '✅ 已注册' : '❌ 未注册'}`);
            console.log(`   🔐 承诺哈希: ${record.commitmentHash.toString()}`);
            console.log(`   ⏰ 最后验证: ${new Date(Number(record.lastVerified) * 1000).toLocaleString()}`);
            console.log(`   🔢 验证次数: ${record.verificationCount.toString()}`);
            
            // 检查各项要求的验证状态
            console.log("   📋 要求验证状态:");
            for (const req of requirements) {
                const requirementId = ethers.keccak256(ethers.toUtf8Bytes(req.id));
                const isVerified = await zkCampusPassport.hasVerifiedRequirement(student.wallet.address, requirementId);
                console.log(`     ${req.name}: ${isVerified ? '✅ 已验证' : '❌ 未验证'}`);
            }
            
        } catch (error) {
            console.log(`   ❌ 查询失败: ${error.message}`);
        }
    }

    console.log("\n" + "=".repeat(50)); 
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("演示失败:", error);
        process.exit(1);
    });