const { ethers } = require("hardhat");
const { devlopmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  // const { deployer } = await getNamedAccounts();
  // const { log, deploy } = deployments;
  // const args = ["MetaToken", "MT"];
  // const contract = await deploy("Token", {
  //   from: deployer,
  //   args: args,
  //   log: true,
  //   waitConfirmations: network.config.blockconfirmations || 1,
  // });
  // if (!devlopmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
  //   log("Verifying......");
  //   await verify(contract.address, args);
  // }
};
