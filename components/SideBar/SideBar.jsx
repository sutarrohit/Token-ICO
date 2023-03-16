import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImCross } from "react-icons/im";

// INTENAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../img";
import { Button } from "../components";
import { ICOContext } from "../../context/ICOContext";

const SideBar = ({ openMenu }) => {
  const { connectingToContract } = useContext(ICOContext);

  return (
    <div className={Style.sidebar}>
      <div className={Style.sidebar_container}>
        {/* left Side */}
        <div className={Style.sidebar_container_left}>
          <Link href={{ pathname: "./" }}>
            <div
              className={Style.navbar_container_left_logo}
              onClick={() => {
                openMenu();
              }}
            >
              <Image src={images.logo} alt="Hello" width={80} height={80} />
              <p>Token ICO</p>
            </div>
          </Link>

          <div className={Style.sidebar_container_left_menuBtn}>
            <ImCross
              onClick={() => {
                openMenu();
              }}
            />
          </div>
        </div>

        {/* right side */}
        <div className={Style.sidebar_container_right}>
          <div
            className={Style.navbar_container_right_about}
            onClick={() => {
              openMenu();
            }}
          >
            <Link href={{ pathname: "./about" }}>
              <p>About</p>
            </Link>
          </div>

          <div
            className={Style.navbar_container_right_help}
            onClick={() => {
              openMenu();
            }}
          >
            <Link href={{ pathname: "./help" }}>
              <p>Help</p>
            </Link>
          </div>
        </div>

        <div className={Style.navbar_container_right_connectBtn}>
          <Button connectingToContract={connectingToContract} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
