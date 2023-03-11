const { ethers } = require("hardhat");
const { devlopmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;

  const args = [
    "0xb89a66ea43df876e0Dbf316310e7709a2754354F",
    "0x88A17004a4D99B7095C2C059B3c24ab1B6f49349",
  ];

  const contract = await deploy("ICOContract", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockconfirmations || 1,
  });

  if (!devlopmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying......");
    await verify(contract.address, args);
  }
};
