import React, { useContext, useEffect, useState } from "react";
import Style from "./Button.module.css";

import { ICOContext } from "../../context/ICOContext";

const Button = ({ connectingToContract, btnName }) => {
  const { checkWalletIsConnected, currentAccount, blockchain, ICOProvider } = useContext(ICOContext);

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
