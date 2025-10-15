#!/usr/bin/env bash
set -e
# Demo steps: assumes wasm & generate_witness.js exist under zk/proving_key/gpa_proof_js/
PKG_DIR=zk/proving_key
INPUT_JSON="$PKG_DIR/input.json"
WITNESS="$PKG_DIR/witness.wtns"
PROOF="$PKG_DIR/proof.json"
PUBLIC="$PKG_DIR/public.json"
# Replace GPA and threshold below as integers (e.g., 385 -> 3.85)
GPA=385
THRESHOLD=350
node $PKG_DIR/gpa_proof_js/generate_witness.js $PKG_DIR/gpa_proof.wasm $INPUT_JSON $WITNESS
npx snarkjs groth16 prove $PKG_DIR/gpa_proof_final.zkey $WITNESS $PROOF $PUBLIC
echo "proof/public generated"
