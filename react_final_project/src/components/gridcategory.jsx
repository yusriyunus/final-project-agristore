import React, { Component } from "react";
class GridCategory extends Component {
  render() {
    return (
      <div
        className="col-lg-3 col-md-3"
        style={{
          height: 24 + "vw",
          background: "white",
          margin: "2.5vw"
          // position: "relative"
          // marginTop: "0"
        }}
      >
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{ height: 70 + "%", background: "white" }}
        >
          {/* <h3>{this.props.product}</h3> */}
        </div>
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{
            height: 30 + "%",
            background: this.props.background,
            cursor: "pointer",
            color: "white"
          }}
          onClick={this.props.onDetailClick}
        >
          <center>
            <h3>
              {this.props.product}/{this.props.harga}
            </h3>
          </center>
        </div>
      </div>
    );
  }
}

export default GridCategory;
