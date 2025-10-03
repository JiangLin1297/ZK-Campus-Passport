# ZK-Campus Passport - Starter (Competitions, SCUT MVP)

This repository is a starter scaffold for **ZK-Campus Passport** (competitions edition) focused on SCUT (@mail.scut.edu.cn).

## What's included
- `contracts/` : Rust smart-contract skeletons (identity, badges, reputation) with comments and tests (framework-agnostic placeholder).
- `frontend/` : Next.js frontend scaffold with pages for registration, organizer dashboard, passport view and API mocks.
- `zk/` : ZK spec and a simple proof-generation stub (Python) that simulates producing a proof artifact for testing.
- `docs/` : Architecture, deployment notes, demo script, and roadmap.
- `scripts/` : Helper scripts for local development and packaging.

## How to use
1. Clone this repo or unzip the provided starter into your local machine.
2. For frontend:
   - `cd frontend && npm install`
   - `npm run dev` (runs on port 3000)
3. For contracts:
   - Install Rust toolchain. Update `contracts/` to integrate with Psy SDK when available.
   - `cd contracts && cargo test` (placeholder tests included)
4. ZK prover stub:
   - `cd zk && python3 generate_proof.py --event evt_abc --sdkey sdkey_mock_123`
   - This will create `proofs/` containing a JSON proof artifact (simulated).
5. Read `docs/README.md` for more details.

