#!/bin/bash
set -e

echo "🔍 [1/6] 检查 Circom 与 snarkjs 安装..."
if ! command -v npx &> /dev/null; then
  echo "❌ npx 未安装，请先安装 Node.js (>=18)"
  exit 1
fi
if ! npx --yes circom --version &> /dev/null; then
  echo "❌ circom 未检测到，请执行: npm install -g circom"
  exit 1
fi
if ! npx --yes snarkjs --version &> /dev/null; then
  echo "❌ snarkjs 未检测到，请执行: npm install -g snarkjs"
  exit 1
fi
echo "✅ Circom 与 snarkjs 已安装"
echo

echo "🔍 [2/6] 检查电路文件是否存在..."
if [ ! -f zk/circuits/gpa_proof.circom ]; then
  echo "❌ 未找到 zk/circuits/gpa_proof.circom"
  exit 1
fi
echo "✅ 找到电路文件 gpa_proof.circom"
echo

echo "⚙️ [3/6] 编译电路..."
mkdir -p zk/proving_key
npx circom zk/circuits/gpa_proof.circom --r1cs --wasm --sym -o zk/proving_key > /dev/null
echo "✅ 电路编译完成"
echo

echo "🔍 [4/6] 检查 R1CS 信息..."
npx snarkjs r1cs info zk/proving_key/gpa_proof.r1cs || { echo "❌ R1CS 检查失败"; exit 1; }
echo "✅ R1CS 结构有效"
echo

echo "⚙️ [5/6] 生成测试 witness..."
cat > zk/proving_key/input.json <<EOF
{
  "GPA": 385,
  "thresholdPub": 350,
  "GPAHash": 123456789
}
EOF

node zk/proving_key/gpa_proof_js/generate_witness.js zk/proving_key/gpa_proof.wasm zk/proving_key/input.json zk/proving_key/witness.wtns > /dev/null
if [ -f zk/proving_key/witness.wtns ]; then
  echo "✅ witness 生成成功"
else
  echo "❌ witness 生成失败"
  exit 1
fi
echo

echo "🧠 [6/6] 验证证明流程..."
if [ -f zk/proving_key/gpa_proof_final.zkey ] && [ -f zk/proving_key/verification_key.json ]; then
  npx snarkjs groth16 prove zk/proving_key/gpa_proof_final.zkey zk/proving_key/witness.wtns zk/proving_key/proof.json zk/proving_key/public.json > /dev/null
  npx snarkjs groth16 verify zk/proving_key/verification_key.json zk/proving_key/public.json zk/proving_key/proof.json
else
  echo "⚠️ 尚未执行 setup_zk.sh，跳过最终验证。"
fi

echo
echo "🎉 ZK 电路环境检测完成！"
echo "所有步骤 ✅ 代表你的 ZK 电路已成功导入并可用。"
