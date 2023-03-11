import Web3Modal from "web3modal";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

// INTERNAL IMPORT
import { contractABI, contractAddress, contractERC20ABI, TokenContractAddress } from "./context";
const GOERLI_RPC_URL = process.env.NEXT_PUBLIC_GOERLI_RPC_URL;

const fetchContract = (signerOrProvider) => {
  const getContract = new ethers.Contract(contractAddress, contractABI, signerOrProvider);
  return getContract;
};

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "demo",
      infuraId: { 5: GOERLI_RPC_URL },
    },
  },
};

// Context to send data
export const ICOContext = React.createContext();

export const ICOProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [web3Provider, setWeb3Provider] = useState(null);

  // connect Dapp to smart contract
  const connectingToContract = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        // providerOptions,
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      if (provider) {
        setWeb3Provider(provider);
      }
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      setCurrentAccount(1);
      return contract;
    } catch (error) {
      console.log("Error to Connect Contract", error);
    }
  };

  // Get token balance
  const getTokenBalace = async (add) => {
    if (!add) {
      return "Enter Correct Wallet Address";
    } else {
      const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
      const contract = new ethers.Contract(TokenContractAddress, contractERC20ABI, provider);
      const getBalance = await contract.balanceOf(add);
      const balance = ethers.utils.formatEther(getBalance);
      console.log(balance.toString());
      return balance;
    }
  };

  // Check is wallet is connected or not
  const checkWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return;
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.log(`error is ${error}`);
    }
  };

  // Buy token function
  const buyToken = async (tokens, value) => {
    const getValue = ethers.utils.parseEther(value.toString());
    const contract = await connectingToContract();
    if (getValue) {
      const buyTx = await contract?.distributeToken({ value: getValue });
      console.log("Transaction", buyTx);
    }
  };

  return (
    <ICOContext.Provider
      value={{
        getTokenBalace,
        connectingToContract,
        checkWalletIsConnected,
        buyToken,
        setWeb3Provider,
        currentAccount,
        web3Provider,
      }}
    >
      {children}
    </ICOContext.Provider>
  );
};
