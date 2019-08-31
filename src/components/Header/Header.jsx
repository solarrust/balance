import React from "react";
import Logo from "../Logo/Logo";

function Header(props) {
  return (
    <header className="header">
      <a href="/" className="logo header-logo">
        <Logo />
      </a>
      <a href="/about" className="header-link link">
        about +
      </a>
    </header>
  );
}

export default Header;
