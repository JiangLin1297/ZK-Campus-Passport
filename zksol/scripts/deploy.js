import hre from "hardhat";
import { ethers } from "ethers";
import fs from 'fs';

async function main() {
    console.log("开始部署ZK Campus Passport系统...");

    // 创建provider和获取部署者账户
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const accounts = await provider.listAccounts();
    // 使用Hardhat本地网络的默认私钥
    const deployer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    console.log("部署者地址:", deployer.address);
    console.log("部署者余额:", ethers.formatEther(await provider.getBalance(deployer.address)));

    // 部署GPAVerifier合约
    console.log("\n正在部署GPAVerifier合约...");
    const gpaVerifierArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/GPAVerifier.sol/Groth16Verifier.json"));
    const GPAVerifier = new ethers.ContractFactory(
        gpaVerifierArtifact.abi,
        gpaVerifierArtifact.bytecode,
        deployer
    );
    const gpaVerifier = await GPAVerifier.deploy();
    await gpaVerifier.waitForDeployment();
    const gpaVerifierAddress = await gpaVerifier.getAddress();
    console.log("GPAVerifier合约地址:", gpaVerifierAddress);

    // 等待一下并获取最新nonce
    await new Promise(resolve => setTimeout(resolve, 1000));
    const currentNonce = await provider.getTransactionCount(deployer.address);
    console.log("当前nonce:", currentNonce);

    // 部署ZKCampusPassport合约
    console.log("\n正在部署ZKCampusPassport合约...");
    const zkPassportArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/ZKCampusPassport.sol/ZKCampusPassport.json"));
    const ZKCampusPassport = new ethers.ContractFactory(
        zkPassportArtifact.abi,
        zkPassportArtifact.bytecode,
        deployer
    );
    const zkCampusPassport = await ZKCampusPassport.deploy(gpaVerifierAddress, { nonce: currentNonce });
    await zkCampusPassport.waitForDeployment();
    const zkCampusPassportAddress = await zkCampusPassport.getAddress();
    console.log("ZKCampusPassport合约地址:", zkCampusPassportAddress);

    // 验证部署
    console.log("\n验证部署...");
    const verifierAddress = await zkCampusPassport.gpaVerifier();
    console.log("ZKCampusPassport中的verifier地址:", verifierAddress);
    console.log("部署验证:", verifierAddress === gpaVerifierAddress ? "✅ 成功" : "❌ 失败");

    // 保存部署信息
    const deploymentInfo = {
        network: "localhost",
        deployer: deployer.address,
        contracts: {
            GPAVerifier: gpaVerifierAddress,
            ZKCampusPassport: zkCampusPassportAddress
        },
        timestamp: new Date().toISOString()
    };

    fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("\n部署信息已保存到 deployment.json");

    console.log("\n🎉 ZK Campus Passport系统部署完成!");
    console.log("📋 合约地址:");
    console.log("   GPAVerifier:", gpaVerifierAddress);
    console.log("   ZKCampusPassport:", zkCampusPassportAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("部署失败:", error);
        process.exit(1);
    });