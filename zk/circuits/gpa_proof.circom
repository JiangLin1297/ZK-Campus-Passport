pragma circom 2.0.0;

// gpa_proof.circom
// Private input: GPA (integer, e.g., 385 -> 3.85)
// Public inputs: thresholdPub, GPAHash
// Checks: Poseidon(GPA) == GPAHash  &&  GPA >= thresholdPub

include "circomlib/poseidon.circom";
include "circomlib/comparators.circom";

template GPAProof() {
    signal input GPA;           // 私有
    signal input thresholdPub;  // 公开
    signal input GPAHash;       // 公开

    component h = Poseidon(1);
    h.inputs[0] <== GPA;

    // GreaterEqThan(nbits) from circomlib comparators
    component ge = GreaterEqThan(16); // 16 bits 够用（0-65535）
    ge.in[0] <== GPA;
    ge.in[1] <== thresholdPub;

    // 约束：hash 相等 & GPA >= threshold
    GPAHash === h.out;
    ge.out === 1;
}

component main = GPAProof();
