import React, { Component } from "react";
import { Facebook, Twitter } from "react-sharingbuttons";

class ShareBtns extends Component {
  render() {
    return (
      <div className="share-btns">
        <Facebook url={`${window.location.hostname}/share.html`} />
        {/*<Facebook url="https://balance-test.herokuapp.com/" />*/}
        <Twitter url={`${window.location.hostname}/share.html`} />
        {/*<Twitter url="http://balance.com/" />*/}
      </div>
    );
  }
}

export default ShareBtns;
