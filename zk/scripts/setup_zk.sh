#!/usr/bin/env bash
set -e
# 生成 ptau, zkey, 并导出 solidity verifier
cd zk/proving_key
echo "Generating powers of tau (dev) and zkey..."
npx snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
npx snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="dev" -v
npx snarkjs groth16 setup gpa_proof.r1cs pot12_0001.ptau gpa_proof_0000.zkey
npx snarkjs zkey contribute gpa_proof_0000.zkey gpa_proof_final.zkey --name="dev-contrib" -v
# 导出 solidity verifier 到 contracts
npx snarkjs zkey export solidityverifier gpa_proof_final.zkey ../../zk/contracts/Verifier.sol
echo "Exported Verifier.sol to zk/contracts/"
