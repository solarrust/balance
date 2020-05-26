import React from "react";

class Arrow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div data-parallax-link-scene>
        <span className="arrow" data-parallax-link data-depth="1">
          <span />
        </span>
      </div>
    );
  }
}

export default Arrow;
