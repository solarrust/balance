import React from "react";
import { Link } from "react-router-dom";

import Logo from "../SVG/Logo";

// TODO: Отключать ссылку на лого на главной странице
// TODO: Отключать анимации, когда окно браузера не в фокусе

class Header extends React.Component {
  componentDidMount() {
    this.props.linkParallax();
  }

  render() {
    return (
      <header className="header">
        <div data-parallax-link-scene>
          <Link
            to="/"
            className="logo header-logo"
            data-parallax-link
            data-depth="2"
          >
            <Logo />
          </Link>
        </div>
        <div data-parallax-link-scene>
          <a href="/about/" className="link" data-parallax-link data-depth="2">
            about +
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
