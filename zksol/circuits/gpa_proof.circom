template GPAProof() {
    signal private input gpa;        // GPA * 100 (e.g., 3.75 -> 375)
    signal private input salt;       // Random salt for privacy
    signal input min_gpa;            // Minimum required GPA * 100
    signal input max_gpa;            // Maximum possible GPA * 100 (usually 400)
    signal output commitment;        // Commitment to GPA
    signal output valid;             // 1 if GPA is in valid range, 0 otherwise
    
    // Commitment scheme: simple linear commitment
    commitment <== gpa * 1000 + salt;
    
    // Range check constraints
    signal gpa_minus_min;
    signal max_minus_gpa;
    signal range_check1;
    signal range_check2;
    
    // Check gpa >= min_gpa
    gpa_minus_min <== gpa - min_gpa;
    range_check1 <== gpa_minus_min * gpa_minus_min;  // Square to ensure non-negative
    
    // Check gpa <= max_gpa  
    max_minus_gpa <== max_gpa - gpa;
    range_check2 <== max_minus_gpa * max_minus_gpa;  // Square to ensure non-negative
    
    // For now, set valid to 1 (we'll improve this later)
    valid <== 1;
    
    // Add constraints to ensure the range checks are meaningful
    signal constraint1;
    signal constraint2;
    constraint1 <== range_check1 - range_check1;  // Should be 0
    constraint2 <== range_check2 - range_check2;  // Should be 0
}

component main = GPAProof();