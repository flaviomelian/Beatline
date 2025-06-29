import React from "react";
import Image from "next/image";
import "./Header.css";
import home from "../../assets/home.png";
import audioFile from "../../assets/audio_file.png";
import mic from "../../assets/mic.png";
import account from "../../assets/account.png";

const Header = () => {
  return (
    <div className="header">
      <Image className="in-header" src={home} alt="Home" />
      <div className="options">
        <Image className="in-header" src={audioFile} alt="Audio" />
        <Image className="in-header" src={mic} alt="Mic" />
        <Image className="in-header" src={account} alt="Account" />
      </div>
    </div>
  );
};

export default Header;
