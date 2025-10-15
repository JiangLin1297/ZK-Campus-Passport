/ / zk/contracts/GPAProof.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Verifier.sol";

contract GPAProof is Verifier {
    address public authority; // 权威（school）地址
    mapping(bytes32 => bool) public verifiedGPA;

    event GPAVerified(bytes32 indexed gpaHash, address indexed who, uint256 ts);

    constructor(address _authority) {
        authority = _authority;
    }

    // 提交 proof + authority 对 GPAHash 的签名（personal_sign）
    // public inputs 约定顺序: [thresholdPub, GPAHash]
    function submitProofAndSignature(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[] memory input,
        bytes memory signature
    ) public returns (bool) {
        bool ok = verifyProof(a, b, c, input);
        require(ok, "Invalid zk proof");
        require(input.length >= 2, "bad public input");
        bytes32 gpaHash = bytes32(input[1]);
        bytes32 ethSigned = prefixed(gpaHash);
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(signature);
        address signer = ecrecover(ethSigned, v, r, s);
        require(signer == authority, "signature not from authority");
        verifiedGPA[gpaHash] = true;
        emit GPAVerified(gpaHash, msg.sender, block.timestamp);
        return true;
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function splitSignature(bytes memory sig) internal pure returns (uint8, bytes32, bytes32) {
        require(sig.length == 65, "invalid sig length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        if (v < 27) {
            v += 27;
        }
        return (v, r, s);
    }

    // demo 用：允许更改 authority（生产请用 onlyOwner）
    function setAuthority(address _a) external {
        authority = _a;
    }

    function isVerified(bytes32 gpaHash) external view returns (bool) {
        return verifiedGPA[gpaHash];
    }
}
