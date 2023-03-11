import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import image from "../img/index";
import Style from "../styles/about.module.css";

const about = () => {
  return (
    <div className={Style.about}>
      <div className={Style.about_container}>
        <div className={Style.about_container_img}>
          <Image src={image.about} alt="AboutImage" className={Style.about_container_img_img} height={500} />
        </div>

        <div className={Style.about_container_info}>
          <p>
            Welcome to our token ICO website, where we are excited to introduce our innovative new digital asset to the
            world. <br />
            you can participate in our ICO. During the ICO, you can buy our token at a discounted rate, and you can also
            receive bonuses and other incentives for participating.
            <br />
            Once you own our token, you can use it to transact with other users, trade it on exchanges, or hold it as an
            investment.
            <br />
            Thank you for visiting our token ICO website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default about;
