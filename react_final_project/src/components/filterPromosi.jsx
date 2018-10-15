import React, { Component } from "react";

class Promosi extends Component {
  render() {
    return (
      <label className="container">
        <div className="row">
          <input type="checkbox" value="Jabodetabek" />
          <h3 style={{ marginLeft: 10 + "px" }}>{this.props.promosi}</h3>
        </div>
      </label>
    );
  }
}

export default Promosi;
