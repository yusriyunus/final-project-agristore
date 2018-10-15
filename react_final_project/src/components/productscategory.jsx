import React, { Component } from "react";
import Footer from "./footer";
import "./css/productscategory.css";

class Productscategory extends Component {
  state = { marginTop: "-45vh" };
  render() {
    const { Default } = this.props.margin;

    return (
      <div style={{}}>
        <li
          id="product"
          className="sliderPage"
          style={{
            height: "60vw",
            bottom: "-100vh",
            marginTop: "0"
          }}
        >
          <div
            id="kotak1"
            className="box"
            onClick={() => {
              Default(0);
              this.props.categoryOnClick("cct");
            }}
          >
            <h1>
              <b>CCT</b>
            </h1>
            <h4>
              <b>Coffee, Cacao, Tea</b>
            </h4>
          </div>
          <div
            id="kotak3"
            className="box"
            onClick={() => {
              Default(-500);
            }}
          >
            <h1>
              <b>Top Products</b>
            </h1>
          </div>
          <div
            id="kotak4"
            className="box"
            onClick={() => {
              Default(-100);
            }}
          >
            <h1>
              <b>Vegetables.</b>
            </h1>
          </div>
          <div
            id="kotak5"
            className="box"
            onClick={() => {
              Default(-200);
            }}
          >
            <h1>
              <b>Fruits.</b>
            </h1>
          </div>
          <div
            id="kotak6"
            className="box"
            onClick={() => {
              Default(-300);
            }}
          >
            <h1>
              <b>Spices</b>
            </h1>
          </div>
          <div
            id="kotak8"
            className="box"
            onClick={() => {
              Default(-600);
            }}
          >
            <h1>
              <b>Hot Promo</b>
            </h1>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "16vh",
              margin: "0 0 0 4vw"
            }}
          >
            <Footer style={{}} />
          </div>
        </li>
      </div>
    );
  }
}

export default Productscategory;