# Docs - Getting Started

## Frontend
1. cd frontend
2. npm install
3. npm run dev

Access http://localhost:3000

## Contracts
Placeholder Rust contracts are in contracts/. Integrate with Psy SDK and compile with cargo.

## ZK Prover (simulated)
1. cd zk
2. python3 generate_proof.py --event evt_abc --sdkey sdkey_xyz

This creates proofs/proof_evt_abc_sdkey_xyz.json

## Next Steps
- Replace simulated prover with a real ZK circuit and prover
- Integrate on-chain verifier using Psy SDK
- Implement secure SDKey generation and wallet integration in frontend
