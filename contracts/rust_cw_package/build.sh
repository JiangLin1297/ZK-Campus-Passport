#!/usr/bin/env bash
set -e
echo "Building CosmWasm contract (requires wasm32-unknown-unknown target)."
cd contract
if ! rustup target list | grep wasm32-unknown-unknown | grep installed >/dev/null 2>&1; then
  echo "Installing wasm target..."
  rustup target add wasm32-unknown-unknown
fi
echo "Running cargo build --release --target wasm32-unknown-unknown"
cargo build --release --target wasm32-unknown-unknown
mkdir -p pkg
wasm_file="target/wasm32-unknown-unknown/release/zk_campus_contract.wasm"
if [ -f "$wasm_file" ]; then
  cp "$wasm_file" pkg/contract.wasm
  echo "WASM built to pkg/contract.wasm"
else
  echo "WASM not found at $wasm_file. Please check build output."
  exit 1
fi
