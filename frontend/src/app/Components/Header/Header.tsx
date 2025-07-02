import React from "react";
import Image from "next/image";
import "./Header.css";
import home from "../../assets/home.png";
import audioFile from "../../assets/audio_file.png";
import mic from "../../assets/mic.png";
import account from "../../assets/account.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <Link href="/">
        <Image className="in-header" src={home} alt="Home" />
      </Link>
      <div className="options">
        <Link href="/Audio">
          <Image className="in-header" src={audioFile} alt="Audio" />
        </Link>
        <Link href="/Record">
          <Image className="in-header" src={mic} alt="Mic" />
        </Link>
        <Link href="/Login">
          <Image className="in-header" src={account} alt="Login" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
