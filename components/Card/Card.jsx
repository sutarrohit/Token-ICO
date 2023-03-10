import React, { useContext, useState } from "react";

// INTERNAL IMPORT
import Style from "./Card.module.css";
import { ICOContext } from "../../context/ICOContext";

const Card = () => {
  const { buyToken } = useContext(ICOContext);
  const [tokenPrice, setTokenPrice] = useState("");
  const [ETHPrice, setETHPrice] = useState(0);
  const ETHTokenPrice = "0.00001";

  const CalculateTokenPrice = (e) => {
    setTokenPrice(e.target.value);
    setETHPrice(e.target.value * ETHTokenPrice);
  };

  const AliceETH = `${ETHPrice.toString().slice(1, 4)}`;

  return (
    <div className={Style.card}>
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
  );
};

export default Card;
