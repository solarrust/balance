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
    context.clearRect(0, 0, 1000, 1000);
    this.paint(context);
  }

  paint(context) {
    this.props.items.forEach((el, i) => {
      let questionCircle = new Path2D();
      questionCircle.moveTo(`${12.5 * i}%`, "50%");
      context.save();
      context.fillStyle = "#000";
      context.restore();
    });
  }

  render() {
    return <canvas width={1000} height={1000} className="result-canvas" />;
  }
}

export default ShareResultImg;
