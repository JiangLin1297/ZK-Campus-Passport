ZK module for ZK-Campus Passport (demo)
--------------------------------------

Structure:
  zk/
    circuits/gpa_proof.circom
    contracts/GPAProof.sol
    contracts/Verifier.sol (placeholder; replace with snarkjs output)
    scripts/*.sh, deploy script

Quick start (local demo):
1) Install prerequisites:
   - Node >= 18, npm
   - npm i -g circom snarkjs  (or use npx for snarkjs/circom)
   - npm i --save-dev hardhat @nomiclabs/hardhat-ethers
   - npm i circomlibjs ffjavascript snarkjs ethers

2) Put this zk/ into your repo root (or keep as is).

3) Compile circuit:
   bash zk/scripts/compile_circuit.sh

4) Setup zkey & export Verifier.sol:
   bash zk/scripts/setup_zk.sh
   (this will overwrite zk/contracts/Verifier.sol with snarkjs-generated verifier)

5) Start local chain & deploy:
   npx hardhat node
   npx hardhat run zk/scripts/deploy_gpa_contract.js --network localhost

6) Generate proof (demo) & submit:
   - prepare zk/proving_key/input.json with fields: GPA, thresholdPub, GPAHash
   - bash zk/scripts/generate_demo_proof.sh
   - then use the generated proof/public to call contract.submitProofAndSignature(...)
