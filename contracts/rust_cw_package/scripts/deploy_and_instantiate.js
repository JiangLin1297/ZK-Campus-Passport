/*
  Deploy & instantiate script for CosmWasm contract demo.

  Configure via environment variables (or edit below):
    RPC (e.g. https://rpc.testnet.example:26657)
    CHAIN_ID (e.g. testnet-1)
    PREFIX (bech32 prefix, e.g. cosmos, juno, osmo)
    MNEMONIC (deployer's mnemonic)
    WASM_PATH (contract/pkg/contract.wasm)
*/
const fs = require('fs');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');

const RPC = process.env.RPC || "https://rpc.testnet.cosmwasm.example:26657";
const CHAIN_ID = process.env.CHAIN_ID || "testnet-1";
const PREFIX = process.env.PREFIX || "cosmos";
const MNEMONIC = process.env.MNEMONIC || "";
const WASM_PATH = process.env.WASM_PATH || "contract/pkg/contract.wasm";

if (!MNEMONIC) {
  console.error("Please set MNEMONIC env var for deployer account (funded on testnet).");
  process.exit(1);
}

async function main() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, { prefix: PREFIX });
  const [firstAccount] = await wallet.getAccounts();
  console.log("Deployer address:", firstAccount.address);

  console.log("Connecting to RPC:", RPC);
  const client = await SigningCosmWasmClient.connectWithSigner(RPC, wallet);
  const wasm = fs.readFileSync(WASM_PATH);
  console.log("Uploading wasm (this will cost tokens)...");
  const uploadReceipt = await client.upload(firstAccount.address, wasm, "auto");
  const codeId = uploadReceipt.codeId;
  console.log("Uploaded. CodeId:", codeId);

  // instantiate
  const initMsg = {
    admin: firstAccount.address
  };
  const label = "zk-campus-passport-demo";
  const instantiateResult = await client.instantiate(firstAccount.address, codeId, initMsg, label, "auto");
  console.log("Contract instantiated at:", instantiateResult.contractAddress);
  console.log("Done.");
}

main().catch((err)=>{ console.error(err); process.exit(1); });
