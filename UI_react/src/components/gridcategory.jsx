import React, { Component } from "react";
import Rating from "./rating";

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
            color: this.props.color || "white"
          }}
          onClick={this.props.onDetailClick}
        >
          {/* <center> */}
          <div className="col">
            <div className="row justify-content-center ">
              <h3>{this.props.product}</h3>
            </div>
            <div className="row justify-content-center ">
              <h3>
                <Rating
                  starCount={this.props.rating}
                  fontSize="1vw"
                  pointerStatus="none"
                  color="white"
                />
              </h3>
            </div>
            <div className="row justify-content-center ">
              <h2>
                Rp.
                {this.props.harga}
              </h2>
            </div>
          </div>
          {/* </center> */}
        </div>
      </div>
    );
  }
}

export default GridCategory;
