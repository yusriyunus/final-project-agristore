import React, { Component } from "react";
import axios from "axios";
import { cartModified } from "../actioncreators";
import { connect } from "react-redux";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
import DikirimDari from "./filterDikirimDari";
import Promosi from "./filterPromosi";
import Footer from "./footer";

class Sidebar extends Component {
  state = {
    lokasiPengirim: [
      "Jabodetabek",
      "Sumatera",
      "Kalimantan",
      "Sulawesi",
      "Papua"
    ],
    promosi: [
      "Gratis Ongkir",
      "Dengan Diskon",
      "COD",
      "Garansi Harga Termurah"
    ],
    sort: [
      "Populer",
      "Terbaru",
      "Terlaris",
      "Harga terendah-tertinggi",
      "Harga tertinggi-terendah"
    ],
    color: this.props.sidebarProp.font,
    productOnClick: {},
    checkBoxAmount: 14
  };

  componentWillReceiveProps(newProps) {
    this.setState({ productOnClick: newProps.productOnClick });
  }

  // DETAIL PRODUCT FUNCTION //
  renderProductOnClick = () => {
    if (this.state.productOnClick !== undefined) {
      return (
        <div>
          <h3>{this.state.productOnClick.nama}</h3>;
        </div>
      );
    }
    return <h3>Loading...</h3>;
  };
  onCloseClick = () => {
    document.getElementById("detail").style.display = "none";
  };
  onAddToCartClick = () => {
    axios
      .post(API_URL_AGRISTORE + "/addtocart", [
        { email: this.props.user.email, cart: this.props.user.cart },
        this.state.productOnClick,
        1
      ])
      .then(res => {
        alert("added to cart");
        this.props.cartModified(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  ///////////////////////////////

  // SIDEBAR PROPS FUNCTION //
  onSortClick = (id, index) => {
    for (var i = 0; i < this.state.sort.length; i++) {
      document.getElementById(`sort${i}`).checked = false;
    }
    document.getElementById(id).checked = true;
    this.props.sorting(index);
  };

  onFilterClick = (id, filterBy) => {
    for (var i = 0; i < this.state.lokasiPengirim.length; i++) {
      document.getElementById(`filter${i}`).checked = false;
    }
    document.getElementById(id).checked = true;
    this.props.filter(filterBy);
  };

  onDeleteAllClick = () => {
    // document.getElementsByClassName("checkbox").checked = true;
    for (var i = 0; i < this.state.checkBoxAmount; i++) {
      document.getElementsByClassName("checkbox")[i].checked = false;
    }
    // this.setState({});
    this.props.deleteAll();
  };

  renderDikirimDari = () => {
    return this.state.lokasiPengirim.map((component, index) => (
      // <DikirimDari key={index} daerah={x} />
      <label className="container">
        <div className="row">
          <input
            id={`filter${index}`}
            className="checkbox"
            type="checkbox"
            value="Jabodetabek"
            onChange={() => {
              this.onFilterClick("filter" + index, component);
            }}
          />
          <h3 style={{ marginLeft: 10 + "px" }}>{component}</h3>
        </div>
      </label>
    ));
  };
  renderPromosi = () => {
    return this.state.promosi.map((x, index) => (
      <Promosi key={index} promosi={x} />
    ));
  };
  renderSort = () => {
    // return this.state.sort.map((x, index) => <Sort key={index} sort={x} />);
    return this.state.sort.map((component, index) => {
      return (
        <label className="container">
          <div className="row">
            <input
              id={`sort${index}`}
              className="checkbox"
              type="checkbox"
              value="Jabodetabek"
              onChange={() => {
                this.onSortClick("sort" + index, index);
              }}
            />
            <h3 style={{ marginLeft: 10 + "px" }}>{component}</h3>
          </div>
        </label>
      );
    });
  };
  ///////////////////////////////

  render() {
    const { title, detail } = this.props.sidebarProp;
    // console.log(this.state);
    return (
      <div
        ref="sidebar"
        style={{
          padding: 0,
          background: "rgba(6, 71, 6, 0.85)",
          width: "23vw",
          height: "100vw",
          position: "sticky",
          top: "5.7vw",
          zIndex: "2"
        }}
      >
        <div
          id="detail"
          style={{
            background: "rgba(0,0,0,0.5)",
            width: "92vw",
            height: "100vw",
            position: "absolute",
            display: this.props.display,
            flexDirection: "column"
            // flexWrap: "wrap"
          }}
        >
          <div className="row" style={{ padding: "0" }}>
            <div
              className="glyphicon glyphicon-remove-circle"
              style={{
                cursor: "pointer",
                fontSize: "2vw",
                color: "white",
                position: "absolute",
                right: "0",
                margin: "0.8vw",
                zIndex: "1"
              }}
              onClick={this.props.onCloseClick}
            />
          </div>
          <div className="row">
            <div className="col-lg-6" style={{ padding: "0" }}>
              <div
                style={{
                  background: "white",
                  width: "42vw",
                  height: "42vw",
                  margin: "2vw",
                  marginTop: "3vw",
                  marginLeft: "3vw"
                }}
              >
                <h3>{this.renderProductOnClick()}</h3>
              </div>
            </div>
            <div className="col-lg-6" style={{ padding: "0" }}>
              <div
                style={{
                  background: "white",
                  width: "43vw",
                  height: "42vw",
                  marginTop: "3vw",
                  marginRight: "3vw"
                }}
              >
                <div
                  style={{
                    background: "black",
                    color: "white",
                    cursor: "pointer"
                  }}
                  onClick={this.onAddToCartClick}
                >
                  <h3>Add to cart</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: 2 + "vw",
            color: "white",
            opacity: 1
          }}
        >
          <div
            id="title"
            style={{
              borderBottom: 1 + "px solid mintcream",
              padding: 10 + "px"
              // paddingLeft: 0
            }}
            className="row d-flex align-items-end"
          >
            <h1>{title}</h1>
            <h2>{detail}</h2>
          </div>
          <div
            id="filter"
            style={{
              padding: 10 + "px",
              paddingLeft: 0
            }}
          >
            <h4 className="glyphicon glyphicon-filter" />
            <h2 style={{ display: "inline", padding: "0 10px" }}>Filter :</h2>
            <div
              id="dikirimDari"
              style={{
                padding: 10 + "px",
                borderBottom: 1 + "px solid mintcream"
              }}
            >
              <h4>Dikirim dari:</h4>
              {this.renderDikirimDari()}
            </div>
            <div
              id="promosi"
              style={{
                padding: 10 + "px",
                borderBottom: 1 + "px solid mintcream"
              }}
            >
              <h4>Program Promosi:</h4>
              {this.renderPromosi()}
            </div>
          </div>
          <div
            id="sort"
            style={{
              padding: 10 + "px",
              paddingLeft: 0
            }}
          >
            <h4 className="glyphicon glyphicon-sort" />
            <h2 style={{ display: "inline", padding: "0 10px" }}>Sort:</h2>
            <div
              style={{
                padding: 10 + "px",
                paddingTop: 0,
                borderBottom: 1 + "px solid mintcream"
              }}
            >
              {this.renderSort()}
            </div>
          </div>
          <div id="rangeHarga">
            <h2>Batas Harga:</h2>
            <div
              style={{
                padding: 10 + "px",
                paddingTop: 0,
                borderBottom: 1 + "px solid mintcream"
              }}
            >
              <div
                className="container"
                style={{ padding: 20 + "px", paddingBottom: 0 }}
              >
                <div className="row">
                  <h4>
                    <input
                      style={{
                        color: "grey",
                        width: 7 + "vmax",
                        height: 2 + "vmax"
                      }}
                      type="text"
                      placeholder="RP MIN"
                    />
                  </h4>
                  <h1
                    style={{
                      width: 2 + "vmax",
                      height: 1 + "px",
                      border: 1 + "px solid mintcream",
                      margin: 1 + "vmax " + 0.5 + "vmax"
                    }}
                  />
                  <h4>
                    <input
                      style={{
                        color: "grey",
                        width: 7 + "vmax",
                        height: 2 + "vmax"
                      }}
                      type="text"
                      placeholder="RP MAKS"
                    />
                  </h4>
                </div>
                <div className="row" style={{ marginTop: 0.6 + "vmax" }}>
                  <button
                    type="button"
                    className="btn"
                    style={{ width: 17 + "vmax" }}
                  >
                    <h4 style={{ color: "black", margin: 0 }}>TERAPKAN</h4>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: 10 + "px",
              paddingTop: 0
            }}
          >
            <div className="row" style={{ padding: 20 + "px" }}>
              <button
                type="button"
                className="btn"
                style={{ width: 17 + "vmax", cursor: "pointer" }}
                onClick={this.onDeleteAllClick}
              >
                <h4 style={{ color: "black", margin: 0 }}>HAPUS SEMUA</h4>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { cartModified }
)(Sidebar);
