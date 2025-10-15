/ / zk/contracts/Verifier.sol
// PLACEHOLDER Verifier
// After you run snarkjs zkey export solidityverifier, replace this file with the generated Verifier.sol
// This placeholder simply returns true (ONLY for local dev/demo).
// DO NOT use placeholder in production.

pragma solidity ^0.8.17;
contract Verifier {
    function verifyProof(uint[2] memory, uint[2][2] memory, uint[2] memory, uint[] memory) public pure returns (bool) {
        return true;
    }
}
