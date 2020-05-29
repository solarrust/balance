import React, { Component } from "react";
import Slider from "react-slick";

class SimpleSlider extends React.Component {
  render() {
    return <Slider {...this.props.settings}>{this.props.children()}</Slider>;
  }
}

export default SimpleSlider;
