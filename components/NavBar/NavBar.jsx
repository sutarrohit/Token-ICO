import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";

// INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { SideBar, Button } from "../components";
import images from "../../img";
import { ICOContext } from "../../context/ICOContext";

const NavBar = () => {
  const { connectingToContract, currentAccount } = useContext(ICOContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  // functions
  const openMenu = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        {/* left side */}
        <div className={Style.navbar_container_left}>
          <Link href={{ pathname: "./" }}>
            <div className={Style.navbar_container_left_logo}>
              <Image src={images.logo} alt="Hello" width={80} height={80} />
              <p>Token ICO</p>
            </div>
          </Link>
        </div>

        {/* right side */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_about}>
            <Link href={{ pathname: "/about" }}>
              <p>About</p>
            </Link>
          </div>

          <div className={Style.navbar_container_right_help}>
            <Link href={{ pathname: "/help" }}>
              <p>Help</p>
            </Link>
          </div>

          <div className={Style.navbar_container_right_connectBtn}>
            <Button connectingToContract={connectingToContract} currentAccount={currentAccount} />
          </div>
        </div>

        {/*MENU BUTTON FOR MOBILE */}
        <div className={Style.navbar_container_menuBtn}>
          <AiOutlineMenu onClick={() => openMenu()} />
        </div>
      </div>

      {/* SIDEBAR COMPONENT FOR MOBILE */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar openMenu={openMenu} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
