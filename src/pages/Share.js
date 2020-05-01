import React, { Component } from "react";

class Share extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      uuid: ""
    };
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch("/share/:uuid")
      .then(res => res.json())
      .then(uuid => this.setState({ uuid }));
  };

  render() {
    return (
      <div className="App">
        <h1>UUID of image</h1>
        <p>{this.state.uuid}</p>
      </div>
    );
  }
}

export default Share;
