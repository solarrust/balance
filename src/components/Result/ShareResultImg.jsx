import React, { Component } from "react";
import ReactDOM from "react-dom";

class ShareResultImg extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let context;
    context = ReactDOM.findDOMNode(this).getContext("2d");
    this.paint(context);
  }

  componentDidUpdate() {
    const context = ReactDOM.findDOMNode(this).getContext("2d");
    context.clearRect(0, 0, 200, 200);
    this.paint(context);
  }

  paint(context) {
    context.save();
    context.translate(100, 100);
    context.rotate(this.props.rotation, 100, 100);
    context.fillStyle = "#F00";
    context.fillRect(-50, -50, 100, 100);
    context.restore();
  }

  render() {
    return <canvas width={200} height={200} />;
  }
}

export default ShareResultImg;
