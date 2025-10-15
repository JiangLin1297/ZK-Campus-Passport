#!/usr/bin/env bash
set -e
# 运行时需在项目根（包含 zk/）执行
mkdir -p zk/proving_key
echo "Compiling circuit..."
npx circom zk/circuits/gpa_proof.circom --r1cs --wasm --sym -o zk/proving_key
echo "Done. outputs in zk/proving_key/"
