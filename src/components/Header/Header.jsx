import React from "react";
import { Link } from "react-router-dom";

import Logo from "../SVG/Logo";

class Header extends React.Component {
  componentDidMount() {
    this.props.linkParallax();
    this.props.hoverLinks();
    this.props.defaultCursor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.hoverLinks();
    this.props.defaultCursor();
  }

  componentWillUnmount() {
    this.props.defaultCursor();
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
            data-hover-trigger
          >
            <Logo />
          </Link>
        </div>
        <div data-parallax-link-scene>
          <Link
            to="/about/"
            className="link"
            data-parallax-link
            data-depth="2"
            data-hover-trigger
          >
            about +
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
