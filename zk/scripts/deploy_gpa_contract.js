// deploy_gpa_contract.js (hardhat script)
const hre = require("hardhat");
async function main() {
  await hre.run('compile');
  const GPAProof = await hre.ethers.getContractFactory("GPAProof");
  const signers = await hre.ethers.getSigners();
  const authority = signers[1].address; // demo: second account as authority
  const gpa = await GPAProof.deploy(authority);
  await gpa.deployed();
  console.log("GPAProof deployed at:", gpa.address);
  console.log("Authority (demo):", authority);
}
main().catch(e => { console.error(e); process.exit(1); });
