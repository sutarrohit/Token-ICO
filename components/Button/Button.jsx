import React, { useContext, useEffect, useState } from "react";
import Style from "./Button.module.css";

import { ICOContext } from "../../context/ICOContext";

const Button = ({ connectingToContract, btnName }) => {
  const { web3Provider, setWeb3Provider, checkWalletIsConnected, currentAccount } = useContext(ICOContext);
  const [getProvider, setGetProvider] = useState();

  useEffect(() => {
    checkWalletIsConnected();
  }, []);
  return (
    <div className={Style.button}>
      <button
        onClick={() => {
          connectingToContract();
        }}
      >
        {currentAccount ? "Connected" : "Connect"}
      </button>
    </div>
  );
};

export default Button;
