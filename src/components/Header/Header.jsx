import React from "react";
import { Link } from "react-router-dom";

import Logo from "../SVG/Logo";

// TODO: Отключать ссылку на лого на главной странице

function Header() {
  return (
    <header className="header">
      <Link to="" className="logo header-logo">
        <Logo />
      </Link>
      <Link to="about" className="link">
        about +
      </Link>
    </header>
  );
}

export default Header;
