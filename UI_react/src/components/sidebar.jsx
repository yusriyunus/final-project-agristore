import React, { Component } from "react";
import axios from "axios";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
import { cartModified, categoryOnClick, onLogin } from "../actioncreators";
import { connect } from "react-redux";
import Footer from "./footer";
import Rating from "./rating";

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
      // "Dengan Diskon",
      "COD"
      // "Garansi Harga Termurah"
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
    starOnClick: this.props.ratingDefault,
    comment: "",
    sendStatus: false
  };

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({ productOnClick: newProps.productOnClick, starOnClick: 0 });
    // checking for wheter user have already commented or not
    if (
      newProps.productOnClick !== undefined &&
      newProps.productOnClick.userResponds.length > 0
    ) {
      var findComment = false;
      newProps.productOnClick.userResponds.map(responds => {
        if (responds._idUser === newProps.auth.id) {
          findComment = true;
        }
      });
      if (findComment) {
        this.setState({ sendStatus: true });
      } else {
        this.setState({ sendStatus: false });
      }
    } else {
      this.setState({ sendStatus: false });
    }
    ////////////////////////////////////
  }

  // DETAIL PRODUCT FUNCTION //
  onCloseClick = () => {
    document.getElementById("detail").style.display = "none";
  };
  onAddToCartClick = () => {
    if (this.props.auth.username === "") {
      alert("Please Login First");
    } else {
      axios
        .post(API_URL_AGRISTORE + "/addtocart", [
          { email: this.props.user.email, cart: this.props.user.cart },
          this.state.productOnClick,
          1
        ])
        .then(res => {
          alert("added to cart");
          this.props.cartModified(res, this.props.auth.cartOnCheckOut);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  starOnClick = count => {
    this.setState({ starOnClick: count });
  };
  sendButtonProps = () => {
    if (this.state.starOnClick === 0 || this.state.comment === "") {
      return ["lightgray", "none"];
    } else {
      return ["rgba(6, 71, 6, 1)", "all"];
    }
  };
  sendOnclick = () => {
    axios
      .post(API_URL_AGRISTORE + "/userresponds", {
        category: this.state.productOnClick.category,
        _idProduct: this.state.productOnClick._id,
        _idUser: this.props.auth.id,
        userName: this.props.auth.username,
        comment: this.state.comment,
        rating: this.state.starOnClick,
        currentRating: this.state.productOnClick.rating
      })
      .then(res => {
        alert("comment added");
        this.refs.responds.value = "";
        // console.log(res.data[0]);
        this.setState({ productOnClick: res.data[0], sendStatus: true });
        this.props.categoryOnClick(this.state.productOnClick.category);
      })
      .catch(err => {
        alert("sorry something went wrong");
        console.log(err);
      });
  };
  inputComment = () => {
    this.setState({ comment: this.refs.responds.value });
  };
  onDeleteCommentClick = (productOnClick, indexComment) => {
    axios
      .post(API_URL_AGRISTORE + "/deleteresponds", {
        productOnClick,
        indexComment
      })
      .then(res => {
        console.log(res.data[0]);
        alert("comment deleted");
        this.setState({ productOnClick: res.data[0], sendStatus: false });
        this.props.categoryOnClick(this.state.productOnClick.category);
      })
      .catch(err => {
        alert("sorry something went wrong");
        console.log(err);
      });
  };
  renderProductOnClick = () => {
    if (this.state.productOnClick !== undefined) {
      return (
        <div>
          <h3>{this.state.productOnClick.nama}</h3>
          <Rating
            starCount={this.state.productOnClick.totalRate}
            fontSize="2vw"
            pointerEvents="none"
          />
        </div>
      );
    }
    return <h3>Loading...</h3>;
  };
  renderProductOnClickDetail = () => {
    if (this.state.productOnClick !== undefined) {
      return (
        <div>
          <h1 style={{ padding: "2vw", paddingBottom: 0 }}>
            <b>Deskripsi</b>
          </h1>
          <hr />
          <hr />
          <div style={{ paddingLeft: "3vw" }}>
            <i>
              <h2>
                <b>Nama Produk:</b>
              </h2>
              <h3 style={{ paddingLeft: "1vw" }}>
                {this.state.productOnClick.nama}
              </h3>
              <h2>
                <b>Category:</b>
              </h2>
              <h3 style={{ paddingLeft: "1vw" }}>
                {this.state.productOnClick.category}
              </h3>
              <h2>
                <b>Lokasi Pengirim:</b>
                <h3 style={{ paddingLeft: "1vw" }}>
                  {this.state.productOnClick.lokasiPengirim}
                </h3>
              </h2>
              <h2>
                <b>Stok Tersedia:</b>
              </h2>
              <h3 style={{ paddingLeft: "1vw" }}>
                {this.state.productOnClick.stokTersedia}
              </h3>
              <h2>
                <b>Promosi:</b>
              </h2>
              <h3 style={{ paddingLeft: "1vw" }}>
                {this.state.productOnClick.promosi}
              </h3>
              <h2>
                <b>Harga:</b>
              </h2>
              <h3 style={{ paddingLeft: "1vw" }}>
                Rp.
                {this.state.productOnClick.price}
              </h3>
            </i>
          </div>
        </div>
      );
    }
  };
  renderCardCommentTitle = () => {
    if (this.props.productOnClick !== undefined) {
      return (
        <div>
          <h3>
            {this.state.productOnClick.userResponds.length} Comment On this
            Product
          </h3>
          <hr />
          <hr />
        </div>
      );
    }
  };
  renderUserResponds = () => {
    if (!this.state.sendStatus) {
      return (
        <div
          style={{
            position: "absolute",
            bottom: "2.6vw",
            padding: "1vw",
            width: "90%"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "end",
              margin: "2em"
            }}
          >
            <Rating
              starCount={this.state.starOnClick}
              starOnClick={this.starOnClick}
              fontSize="1.5vw"
              pointerEvents="all"
            />
          </div>
          <div>
            <div className="col-xs-12">
              <center>
                <h4>
                  <input
                    id="responds"
                    ref="responds"
                    type="text"
                    style={{
                      width: "80%",
                      height: "4vw",
                      border: "1px solid lightgrey",
                      padding: "1em"
                    }}
                    placeholder="Write comment..."
                    onChange={this.inputComment}
                  />
                  <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{
                      background: this.sendButtonProps()[0],
                      color: "white",
                      margin: "0",
                      height: "2.5vmax",
                      width: "40%",
                      cursor: "pointer",
                      margin: "1em",
                      borderRadius: "5px",
                      pointerEvents: this.sendButtonProps()[1]
                    }}
                    onClick={this.sendOnclick}
                  >
                    <h3>Send</h3>
                  </div>
                </h4>
              </center>
            </div>
          </div>
        </div>
      );
    }
  };
  renderProductComments = () => {
    if (this.props.productOnClick !== undefined) {
      if (this.state.productOnClick.userResponds.length > 0) {
        return this.state.productOnClick.userResponds.map((responds, index) => {
          return (
            <div>
              <div style={{ marginLeft: "1.5vw" }}>
                <h4>
                  <b>{responds.userName}</b>
                </h4>
                {this.renderDeleteComment(index)}
                <div style={{ marginLeft: "1vw" }}>
                  <Rating
                    starCount={responds.rating}
                    fontSize=".8vw"
                    pointerEvents="none"
                  />
                  <h4>{responds.comment}</h4>
                </div>
              </div>
              <hr />
            </div>
          );
        });
      }
    } else {
      return <h3 />;
    }
  };
  renderDeleteComment = index => {
    if (
      this.state.productOnClick.userResponds[index]._idUser ===
      this.props.auth.id
    ) {
      return (
        <h6
          style={{ cursor: "pointer" }}
          onClick={() =>
            this.onDeleteCommentClick(this.state.productOnClick, index)
          }
        >
          (delete comment)
        </h6>
      );
    } else {
      return <h6 />;
    }
  };
  ///////////////////////////////

  // SIDEBAR PROPS FUNCTION //
  onSortClick = (id, index) => {
    for (var i = 0; i < this.state.sort.length; i++) {
      this.refs[`sort${i}`].checked = false;
    }
    this.refs[id].checked = true;
    this.props.sorting(index);
  };

  onFilterDaerah = (id, filterBy) => {
    if (
      this.refs["promosi0"].checked === true ||
      this.refs["promosi1"].checked === true
    ) {
      for (var i = 0; i < this.state.promosi.length; i++) {
        this.refs[`promosi${i}`].checked = false;
      }
      for (var i = 0; i < this.state.lokasiPengirim.length; i++) {
        this.refs[`filter${i}`].checked = false;
      }
      this.refs[id].checked = true;
      this.props.filterDaerah(filterBy);
    } else {
      for (var i = 0; i < this.state.lokasiPengirim.length; i++) {
        this.refs[`filter${i}`].checked = false;
      }
      this.refs[id].checked = true;
      this.props.filterDaerah(filterBy);
    }
  };

  onFilterPromosi = (id, filterBy) => {
    for (var i = 0; i < this.state.promosi.length; i++) {
      this.refs[`promosi${i}`].checked = false;
    }
    this.refs[id].checked = true;
    this.props.filterPromosi(filterBy);
  };

  onFilterHargaClick = () => {
    var hargamin = this.refs.hargamin.value;
    var hargamaks = this.refs.hargamaks.value;
    this.props.filterHarga(hargamin, hargamaks);
  };

  onDeleteAllClick = () => {
    for (var i = 0; i < this.state.lokasiPengirim.length; i++) {
      this.refs[`filter${i}`].checked = false;
    }
    for (var i = 0; i < this.state.promosi.length; i++) {
      this.refs[`promosi${i}`].checked = false;
    }
    for (var i = 0; i < this.state.sort.length; i++) {
      this.refs[`sort${i}`].checked = false;
    }
    this.refs.hargamin.value = "";
    this.refs.hargamaks.value = "";
    this.props.deleteAll();
  };

  renderDikirimDari = () => {
    return this.state.lokasiPengirim.map((component, index) => (
      <label className="container">
        <div className="row">
          <input
            id={`filter${index}`}
            ref={`filter${index}`}
            type="checkbox"
            value="Jabodetabek"
            onChange={() => {
              this.onFilterDaerah("filter" + index, component);
            }}
          />
          <h3 style={{ marginLeft: 10 + "px" }}>{component}</h3>
        </div>
      </label>
    ));
  };
  renderPromosi = () => {
    return this.state.promosi.map((component, index) => (
      <label className="container">
        <div className="row">
          <input
            id={`promosi${index}`}
            ref={`promosi${index}`}
            type="checkbox"
            onChange={() => {
              this.onFilterPromosi("promosi" + index, component);
            }}
          />
          <h3 style={{ marginLeft: 10 + "px" }}>{component}</h3>
        </div>
      </label>
    ));
  };
  renderSort = () => {
    return this.state.sort.map((component, index) => {
      return (
        <label className="container">
          <div className="row">
            <input
              id={`sort${index}`}
              ref={`sort${index}`}
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
            flexDirection: "column",
            zIndex: 1
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
            <div className="col-lg-6 " style={{ padding: "0" }}>
              <div
                style={{
                  background: "white",
                  width: "42vw",
                  height: "40.5vw",
                  margin: "2vw",
                  marginTop: "3vw",
                  marginLeft: "3vw"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "3.5vw",
                    padding: "1vw",
                    width: "90%"
                  }}
                >
                  <div style={{ margin: "1vw" }}>
                    {this.renderProductOnClick()}
                  </div>
                  <div className="row d-flex justify-content-center align-items-center">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        background: "rgba(6, 71, 6, 1)",
                        height: "2.5vmax",
                        width: "70%",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px"
                      }}
                      onClick={this.onAddToCartClick}
                    >
                      <h3>Add to cart</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" style={{ padding: "0" }}>
              <div
                style={{
                  background: "white",
                  width: "43vw",
                  height: "40.5vw",
                  marginTop: "3vw",
                  marginRight: "3vw"
                }}
              >
                {this.renderProductOnClickDetail()}
                {this.renderUserResponds()}
              </div>
            </div>
          </div>
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-lg-12">
              <div
                style={{
                  background: "white",
                  width: "96%",
                  height: "30vw",
                  margin: "1.4vw",
                  padding: "2vw",
                  marginTop: 0
                  // flex: 1
                }}
              >
                {this.renderCardCommentTitle()}
                {this.renderProductComments()}
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
                      ref="hargamin"
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
                      ref="hargamaks"
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
                    onClick={this.onFilterHargaClick}
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

const mapStateToProps = globalState => {
  const auth = globalState.auth;
  return { auth };
};

export default connect(
  mapStateToProps,
  { cartModified, categoryOnClick, onLogin }
)(Sidebar);
