import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CustomInput, FormGroup } from "reactstrap";
import { cartModified } from "../actioncreators";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
import Footer from "./footer";

class Payment extends Component {
  state = {
    cartOnCheckOut: [],
    kurirClck: false,
    alamatClick: false,
    alamat: "",
    kurir: ""
  };

  componentWillReceiveProps(newProps) {
    var today = new Date();
    if (newProps.auth.cartOnCheckOut.length === 0) {
      this.render = () => {
        alert("thankyou!");
        return <Redirect to="/" />;
      };
    }
    newProps.auth.cartOnCheckOut.map((cart, index) => {
      this.state.cartOnCheckOut.push({
        _idProduct: cart._id,
        _idUser: newProps.auth.id,
        nama: cart.nama,
        harga: cart.price,
        jumlah: cart.amount,
        totalPrice: cart.totalPrice,
        alamat: this.state.alamat,
        kurir: this.state.kurir,
        tanggal:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate(),
        waktu:
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      });
    });
  }

  componentWillUpdate(newProps, newState) {
    // if (this.state.alamat !== "" || this.state.kurir !== "")
    this.state.cartOnCheckOut.map((cart, index) => {
      this.state.cartOnCheckOut[index] = {
        ...cart,
        alamat: newState.alamat,
        kurir: newState.kurir
      };
    });
  }

  paymentButtonProps = () => {
    if (!this.state.alamatClick || !this.state.kurirClck) {
      return ["lightgray", "none"];
    } else {
      return ["rgba(6, 71, 6, 1)", "all"];
    }
  };

  onKurirClick = ref => {
    this.setState({ kurirClck: true, kurir: this.refs[ref].value });
    // console.log(this.refs[ref].value);
  };

  onTambahkanAlamatClick = () => {
    if (!this.state.alamatClick) {
      if (this.refs.alamat.value !== "") {
        this.setState({
          alamat: this.refs.alamat.value,
          alamatClick: true
        });
      }
    }
  };

  onBayarClick = () => {
    var cartOnCheckOutId = [];
    this.props.auth.cartOnCheckOut.map((cart, index) => {
      cartOnCheckOutId.push(cart.id);
    });
    axios
      .post(API_URL_AGRISTORE + "/payment", [
        this.props.auth,
        cartOnCheckOutId,
        this.state.cartOnCheckOut
      ])
      .then(res => {
        alert("berhasil");
        this.props.cartModified(res, []);
        console.log(res);
      })
      .catch(err => {
        alert("gagal");
        console.log(err);
      });
  };

  renderAlamat = () => {
    if (!this.state.alamatClick) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h3>
              <input
                ref="alamat"
                type="textbox"
                style={{ width: "100%", height: "10vw" }}
              />
            </h3>
          </div>
        </div>
      );
    } else {
      return <h3>{this.state.alamat}</h3>;
    }
  };

  renderCart = () => {
    if (this.state.cartOnCheckOut.length > 0) {
      return this.state.cartOnCheckOut.map((cart, index) => {
        return (
          <div key={index} className="row">
            <h3 style={{ margin: "0", paddingLeft: "1rem" }}>
              {cart.nama}/{cart.amount} - Rp.
              {cart.totalPrice}
            </h3>
          </div>
        );
      });
    } else {
      return <h3 />;
    }
  };

  renderTotalPrice = () => {
    var price = 0;
    this.state.cartOnCheckOut.map(cart => {
      price += cart.totalPrice;
    });
    return price;
  };

  render() {
    console.log(this.props, this.state);
    // if (this.props.auth.cartOnCheckOut.length === 0) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div style={{ height: "100vh" }}>
        <div
          style={{
            marginLeft: "6vw",
            marginTop: "10vh",
            width: "88vw"
          }}
        >
          <div className="row" style={{ padding: "0 3vw" }}>
            <h1>
              <b>Checkout</b>
            </h1>
          </div>
          <div className="col-xs-8" style={{ padding: "0 2vw" }}>
            <div className="row" style={{ margin: ".8vw 0" }}>
              <div
                className="glyphicon glyphicon-map-marker"
                style={{ fontSize: "1.2vw" }}
              />
              <h3 style={{ marginLeft: ".8vw" }}>Alamat Pengiriman</h3>
            </div>
            <div
              //   className="row"
              style={{
                boxShadow: "1px 1px 2px 2px lightgray",
                margin: "0",
                marginBottom: "2vw",
                padding: "1rem"
              }}
            >
              {this.renderAlamat()}
              <div className="row">
                <div
                  className="col-xs-12"
                  style={{ cursor: "pointer" }}
                  onClick={this.onTambahkanAlamatClick}
                >
                  <h4>
                    <b>Tambahkan Alamat</b>
                  </h4>
                </div>
              </div>
            </div>
            <div className="row" style={{ margin: ".8vw 0" }}>
              <div
                className="fa fa-truck"
                style={{ fontSize: "1.2vw", transform: "scaleX(-1)" }}
              />
              <h3 style={{ marginLeft: ".8vw" }}>Kurir Pengiriman</h3>
            </div>
            <div
              style={{
                boxShadow: "1px 1px 2px 2px lightgray",
                margin: "0",
                marginBottom: "2vw",
                padding: "1rem"
              }}
            >
              <div className="row" style={{ margin: "0" }}>
                <h3 style={{ margin: "0", paddingLeft: "1rem" }}>
                  Penjual : Agristore
                </h3>
              </div>
              <hr />
              <div className="row" style={{ margin: "0" }}>
                <div className="col-xs-8">{this.renderCart()}</div>
                <div className="col-xs-4">
                  <h4 style={{ color: "gray" }}>Kurir Pengiriman</h4>
                  <FormGroup>
                    <CustomInput
                      type="select"
                      id="exampleCustomSelect"
                      name="customSelect"
                    >
                      <option>--Pilih Kurir--</option>
                      <option
                        ref="jnereg"
                        onClick={() => {
                          this.onKurirClick("jnereg");
                        }}
                      >
                        JNE REG
                      </option>
                      <option
                        ref="jneok"
                        onClick={() => {
                          this.onKurirClick("jneok");
                        }}
                      >
                        JNE OKE
                      </option>
                      <option
                        ref="pos"
                        onClick={() => {
                          this.onKurirClick("pos");
                        }}
                      >
                        Pos Indonesia
                      </option>
                      <option
                        ref="jt"
                        onClick={() => {
                          this.onKurirClick("jt");
                        }}
                      >
                        J&T
                      </option>
                    </CustomInput>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ margin: ".8vw 0", color: "grey" }}>
            <h3>
              <b>Ringkasan Belanja</b>
            </h3>
          </div>
          <div className="col-xs-4" style={{ padding: "0" }}>
            <div
              style={{
                boxShadow: "1px 1px 2px 2px lightgray",
                margin: "0",
                padding: "1rem"
              }}
            >
              <div className="row">
                <div className="col-xs-6">
                  <h4>Total Harga</h4>
                </div>
                <div className="col-xs-6 d-flex justify-content-end">
                  <h4>
                    Rp.
                    {this.renderTotalPrice()}
                  </h4>
                </div>
              </div>
              <hr />
              <div
                className="row justify-content-center align-items-center"
                style={{
                  background: this.paymentButtonProps()[0],
                  color: "white",
                  margin: "0",
                  height: "2.5vw",
                  cursor: "pointer",
                  pointerEvents: this.paymentButtonProps()[1]
                }}
                onClick={this.onBayarClick}
              >
                <h3>Bayar</h3>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "4vw" }}>
          <Footer />
        </div>
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
  { cartModified }
)(Payment);
