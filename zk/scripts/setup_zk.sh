#!/usr/bin/env bash
set -e
# 生成 ptau, zkey, 并导出 solidity verifier
cd zk/proving_key
echo "Generating powers of tau (dev) and zkey..."

# 1. 初始化 Powers of Tau (初始文件)
npx snarkjs powersoftau new bn128 12 pot12_0000.ptau -v

# 2. 贡献随机数（模拟，实际环境需要多轮贡献）
npx snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="dev" -v

# 3. 最终化处理（生成最终的 ptau 文件，关键步骤！）
npx snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v

# 4. 基于最终 ptau 文件生成 zkey
npx snarkjs groth16 setup gpa_proof.r1cs pot12_final.ptau gpa_proof_0000.zkey

# 5. 贡献 zkey 随机数（模拟）
npx snarkjs zkey contribute gpa_proof_0000.zkey gpa_proof_final.zkey --name="dev-contrib" -v

# 6. 导出 solidity 验证器
npx snarkjs zkey export solidityverifier gpa_proof_final.zkey ../../zk/contracts/Verifier.sol
echo "Exported Verifier.sol to zk/contracts/"