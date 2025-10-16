ZK-Campus-Passport — CosmWasm (Rust) smart contract demo
=======================================================

What this archive contains:
- contract/: CosmWasm Rust contract (simple registry of GPA attestations)
- scripts/: JS deploy & query scripts using @cosmjs/cosmwasm-stargate
- package.json: deps for deploy scripts
- build.sh: helper to build the wasm
- README contains quick steps to build/deploy to a configurable testnet.

Notes:
- Demo contract stores attestations: gpa_hash, issuer, submitter, timestamp.
- This demo DOES NOT perform on-chain cryptographic signature verification.
- You need a CosmWasm-compatible testnet RPC and a funded testnet account for deployment.

Quick start:
1. Build wasm:
   cd contract
   ./build.sh

2. Install node deps and deploy (configure RPC, CHAIN_ID, PREFIX, MNEMONIC env vars):
   npm install
   node scripts/deploy_and_instantiate.js
