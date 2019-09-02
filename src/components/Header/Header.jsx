import React from "react";
import { Link } from "react-router-dom";

import Logo from "../SVG/Logo";

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="logo header-logo">
        <Logo />
      </Link>
      <Link to="/about" className="link header-logo">
        about +
      </Link>
    </header>
  );
}

export default Header;
