import React, { Component } from "react";
import { Facebook, Twitter } from "react-sharingbuttons";

class ShareBtns extends Component {
  render() {
    return (
      <div className={"share-btns"}>
        <button onClick={this.props.onClick} url={this.props.url} />
        <button onClick={this.props.onClick} url={this.props.url} />
      </div>
    );
  }
}

export default ShareBtns;
