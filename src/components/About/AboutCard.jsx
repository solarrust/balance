import React, { Component } from "react";

class AboutCard extends Component {
  componentDidMount() {
    this.props.hoverLinks();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.hoverLinks();
  }

  render() {
    return <div className="about-card">{this.props.children}</div>;
  }
}

export default AboutCard;
