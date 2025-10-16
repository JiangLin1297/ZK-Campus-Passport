/*
  Query script:
    Set RPC and CONTRACT_ADDRESS env vars and run: node scripts/query.js
*/
const { CosmWasmClient } = require('@cosmjs/cosmwasm-stargate');

const RPC = process.env.RPC || "https://rpc.testnet.cosmwasm.example:26657";
const CONTRACT = process.env.CONTRACT_ADDRESS || "";

if (!CONTRACT) {
  console.error("Please set CONTRACT_ADDRESS env var.");
  process.exit(1);
}

async function main() {
  const client = await CosmWasmClient.connect(RPC);
  const res = await client.queryContractSmart(CONTRACT, { list_attestations: {} });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);
