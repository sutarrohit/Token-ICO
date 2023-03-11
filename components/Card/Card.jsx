import React, { useContext, useState } from "react";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./Card.module.css";
import { ICOContext } from "../../context/ICOContext";

const Card = () => {
  const { buyToken, getTokenBalace } = useContext(ICOContext);
  const [tokenPrice, setTokenPrice] = useState("");
  const [ETHPrice, setETHPrice] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const ETHTokenPrice = "0.00001";

  const CalculateTokenPrice = (e) => {
    setTokenPrice(e.target.value);
    setETHPrice(e.target.value * ETHTokenPrice);
  };
  const AliceETH = `${ETHPrice.toString().slice(1, 4)}`;

  const getBalace = async () => {
    const balance = await getTokenBalace(userAddress);
    setUserBalance(balance);
    console.log("getBalance", userBalance);
  };

  return (
    <div className={Style.card}>
      <div className={Style.card_container_left}>
        <div className={Style.card_container_info}>
          <div className={Style.card_container_info_Address}>
            <p>Contract Address</p>
            <Link href={{ pathname: "https://goerli.etherscan.io/address/0xb89a66ea43df876e0Dbf316310e7709a2754354F" }}>
              <p>0xb89a6...54354F</p>
            </Link>
          </div>

          <div className={Style.card_container_info_status}>
            <p>Check your Token Balance</p>
            <input
              type="text"
              placeholder="Enter Your Wallet Address"
              onChange={(e) => {
                setUserAddress(e.target.value);
              }}
            />
            <input
              type="text"
              defaultValue={userBalance ? `${userBalance} Tokens` : ""}
              placeholder="Token Balance"
              className={Style.card_container_info_status_balance}
            />
          </div>

          <div className={Style.card_container_info_balanceBtn}>
            <button
              onClick={() => {
                getBalace();
              }}
            >
              Check Balance
            </button>
          </div>
        </div>
      </div>

      <div className={Style.card_container_right}>
        <div className={Style.card_container}>
          <div className={Style.card_container_name}>
            <p>Meta Token ICO</p>
          </div>
          <div className={Style.card_container_price}>
            <p>Price = 1Token/0.000016ETH </p>
          </div>

          <div className={Style.card_container_input}>
            <input
              type="text"
              placeholder="0 Token"
              onChange={(e) => {
                CalculateTokenPrice(e);
              }}
            />
          </div>
          <div className={Style.card_container_input}>
            <input
              type="text"
              placeholder="0 ETH"
              defaultValue={`${ETHPrice?.toString().slice(0, 7)} ETH`}
              className={Style.card_container_inputETH}
            />
          </div>

          <div className={Style.card_container_buyBtn}>
            <button
              onClick={() => {
                buyToken(tokenPrice, ETHPrice);
              }}
            >
              Buy Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
