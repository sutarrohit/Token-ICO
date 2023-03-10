import Web3Modal from "web3modal";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

// INTERNAL IMPORT
import { contractABI, contractAddress } from "./context";

let getContract;

const fetchContract = (signerOrProvider) => {
  getContract = new ethers.Contract(contractAddress, contractABI, signerOrProvider);
  return getContract;
};

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "demo",
      infuraId: { 5: "https://goerli.infura.io/v3/5be2549ae25048528139423040e0e8ad" },
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
