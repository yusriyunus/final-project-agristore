import React, { Component } from "react";
class DikirimDari extends Component {
  render() {
    return (
      <label className="container">
        <div className="row">
          <input type="checkbox" value="Jabodetabek" />
          <h3 style={{ marginLeft: 10 + "px" }}>{this.props.daerah}</h3>
        </div>
      </label>
    );
  }
}

export default DikirimDari;
