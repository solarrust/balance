import React from "react";

class Arrow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span className="arrow" data-parallax-link data-depth="1">
        <span />
      </span>
    );
  }
}

export default Arrow;
