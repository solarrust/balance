import React, { Component } from "react";
import { Facebook, Twitter } from "react-sharingbuttons";

class ShareBtns extends Component {
  render() {
    const local = `${window.location.protocol}//${window.location.hostname}`;
    const url = `${local}/share`;
    const shareText = "Check this site!";

    return (
      <div className="share-btns">
        <div data-hover-trigger>
          <Facebook url={url} />
        </div>
        <div data-hover-trigger>
          <Twitter url={url} shareText={shareText} />
        </div>
      </div>
    );
  }
}

export default ShareBtns;
