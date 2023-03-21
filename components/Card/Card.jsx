import React, { useContext, useState } from "react";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./Card.module.css";
import { ICOContext } from "../../context/ICOContext";

const Card = () => {
  const { buyToken, getTokenBalace, msg } = useContext(ICOContext);
  const [tokenPrice, setTokenPrice] = useState("");
  const [ETHPrice, setETHPrice] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const ETHTokenPrice = "0.00001";

  const CalculateTokenPrice = (e) => {
    setTokenPrice(e.target.value);
    setETHPrice(e.target.value * ETHTokenPrice);
  };

  const getBalace = async () => {
    setUserBalance("Getting token data wait....");
    const balance = await getTokenBalace(userAddress);
    setUserBalance(balance);
    console.log("getBalance", userBalance);
  };

  const handleKeyPress = (e) => {
    const regex = /^[0-9\b]+$/; // Regular expression to allow only numbers
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={Style.main}>
      <h2>{msg ? msg : ""}</h2>
      <div className={Style.card}>
        <div className={Style.card_container_left}>
          <div className={Style.card_container_info}>
            <div className={Style.card_container_info_Address}>
              <p>Goerli Contract Address</p>
              <Link
                href={{ pathname: "https://goerli.etherscan.io/address/0x53bd0c51A6052f508C029F4970BE63ea271dA724" }}
              >
                <p>0x53bd0......dA724</p>
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
                onKeyPress={handleKeyPress}
              />
              <input
                type="text"
                defaultValue={
                  userBalance ? `${userBalance} ${userBalance == "Getting token data wait...." ? "" : "Tokens"}` : ""
                }
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
        {/* Right Side */}
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
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className={Style.card_container_input}>
              <input
                type="text"
                placeholder={`${ETHPrice?.toString().slice(0, 7)} ETH`}
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
    </div>
  );
};

export default Card;
