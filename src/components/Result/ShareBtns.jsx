import React, { Component } from "react";
import { Facebook, Twitter } from "react-sharingbuttons";

class ShareBtns extends Component {
  render() {
    const local = window.location.hostname;
    const url = `${local}/share`;
    const shareText = "Check this site!";

    return (
      <div className="share-btns">
        <Facebook url={url} />
        {/*<Facebook url="https://balance-test.herokuapp.com/" />*/}
        <Twitter url={url} shareText={shareText} />
        {/*<Twitter url="http://balance.com/" />*/}
      </div>
    );
  }
}

export default ShareBtns;
