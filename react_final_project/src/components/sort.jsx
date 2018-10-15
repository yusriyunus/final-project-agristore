import React, { Component } from "react";

class Sort extends Component {
  render() {
    return (
      <label className="container">
        <div className="row">
          <input type="checkbox" value="Jabodetabek" />
          <h3 style={{ marginLeft: 10 + "px" }}>{this.props.sort}</h3>
        </div>
      </label>
    );
  }
}

export default Sort;
