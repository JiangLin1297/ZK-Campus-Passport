import * as snarkjs from "snarkjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 生成GPA证明
 * @param {number} gpa - 学生的实际GPA (乘以100，例如3.75 -> 375)
 * @param {number} salt - 随机盐值
 * @param {number} minGpa - 最低GPA要求 (乘以100)
 * @param {number} maxGpa - 最高GPA限制 (乘以100，通常是400)
 * @returns {Object} 包含证明和公开信号的对象
 */
export async function generateGPAProof(gpa, salt, minGpa, maxGpa) {
    try {
        console.log("🔄 开始生成GPA证明...");
        console.log(`📊 输入参数: GPA=${gpa/100}, Salt=${salt}, MinGPA=${minGpa/100}, MaxGPA=${maxGpa/100}`);
        
        // 准备输入
        const input = {
            gpa: gpa,
            salt: salt,
            min_gpa: minGpa,
            max_gpa: maxGpa
        };
        
        console.log("📝 输入信号:", input);
        
        // 计算见证
        console.log("🧮 计算见证...");
        const wasmPath = path.join(__dirname, "..", "gpa_proof.wasm");
        const witness = await snarkjs.wtns.calculate(input, wasmPath);
        
        // 生成证明
        console.log("🔐 生成零知识证明...");
        const zkeyPath = path.join(__dirname, "..", "setup", "gpa_proof_0001.zkey");
        const { proof, publicSignals } = await snarkjs.groth16.prove(zkeyPath, witness);
        
        console.log("✅ 证明生成成功!");
        console.log("📤 公开信号:", publicSignals);
        console.log("🔑 证明:", proof);
        
        return {
            proof,
            publicSignals,
            input: {
                commitment: publicSignals[0],
                valid: publicSignals[1],
                min_gpa: minGpa,
                max_gpa: maxGpa
            }
        };
        
    } catch (error) {
        console.error("❌ 生成证明时出错:", error);
        throw error;
    }
}

/**
 * 验证GPA证明
 * @param {Object} proof - 零知识证明
 * @param {Array} publicSignals - 公开信号
 * @returns {boolean} 验证结果
 */
export async function verifyGPAProof(proof, publicSignals) {
    try {
        console.log("🔍 开始验证证明...");
        
        const vkeyPath = path.join(__dirname, "..", "setup", "verification_key.json");
        const vKey = JSON.parse(fs.readFileSync(vkeyPath));
        
        const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
        
        console.log(res ? "✅ 证明验证成功!" : "❌ 证明验证失败!");
        return res;
        
    } catch (error) {
        console.error("❌ 验证证明时出错:", error);
        throw error;
    }
}

/**
 * 测试证明生成和验证
 */
async function testProofGeneration() {
    console.log("🧪 开始测试GPA证明系统...\n");
    
    try {
        // 测试用例1: 有效的GPA (3.75, 要求最低3.0)
        console.log("📋 测试用例1: 有效GPA");
        const gpa1 = 375;  // 3.75
        const salt1 = 12345;
        const minGpa1 = 300;  // 3.0
        const maxGpa1 = 400;  // 4.0
        
        const result1 = await generateGPAProof(gpa1, salt1, minGpa1, maxGpa1);
        const isValid1 = await verifyGPAProof(result1.proof, result1.publicSignals);
        
        console.log(`结果: ${isValid1 ? '通过' : '失败'}\n`);
        
        // 测试用例2: 边界情况 (刚好达到最低要求)
        console.log("📋 测试用例2: 边界GPA");
        const gpa2 = 300;  // 3.0
        const salt2 = 67890;
        const minGpa2 = 300;  // 3.0
        const maxGpa2 = 400;  // 4.0
        
        const result2 = await generateGPAProof(gpa2, salt2, minGpa2, maxGpa2);
        const isValid2 = await verifyGPAProof(result2.proof, result2.publicSignals);
        
        console.log(`结果: ${isValid2 ? '通过' : '失败'}\n`);
        
        // 保存证明到文件
        const proofData = {
            testCase1: {
                input: { gpa: gpa1/100, salt: salt1, minGpa: minGpa1/100, maxGpa: maxGpa1/100 },
                proof: result1.proof,
                publicSignals: result1.publicSignals,
                verified: isValid1
            },
            testCase2: {
                input: { gpa: gpa2/100, salt: salt2, minGpa: minGpa2/100, maxGpa: maxGpa2/100 },
                proof: result2.proof,
                publicSignals: result2.publicSignals,
                verified: isValid2
            }
        };
        
        const outputPath = path.join(__dirname, "..", "proofs", "test_proofs.json");
        
        // 确保proofs目录存在
        const proofsDir = path.dirname(outputPath);
        if (!fs.existsSync(proofsDir)) {
            fs.mkdirSync(proofsDir, { recursive: true });
        }
        
        fs.writeFileSync(outputPath, JSON.stringify(proofData, null, 2));
        console.log(`💾 测试证明已保存到: ${outputPath}`);
        
        console.log("🎉 所有测试完成!");
        
    } catch (error) {
        console.error("❌ 测试过程中出错:", error);
    }
}

// 直接执行测试
testProofGeneration();