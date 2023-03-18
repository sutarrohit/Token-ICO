require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",

  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      chainId: 5,
      blockconfirmations: 1,
    },

    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      chainId: 11155111,
      blockconfirmations: 1,
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      5: 1,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
