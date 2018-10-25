import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
import { cartModified } from "../actioncreators";
import Footer from "./footer";

class Checkout extends Component {
  state = {
    cart: [],
    checkValue: [],
    cartOnCheck: [],
    mappingCartList: false,
    selectAll: false,
    selectAllCheckValue: false,
    checkOutClick: false
  };

  componentWillMount() {
    this.setState({ cart: this.props.user.cart });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.user.cookie) {
      console.log("cookie");
      this.setState({
        cart: newProps.user.cart,
        mappingCartList: false
      });
    } else {
      console.log("tidak cookie");
      this.setState({
        cart: newProps.user.cart,
        mappingCartList: true
      });
    }
  }

  indexOfCartOnCheck_Updated = cartOnUpdated => {
    for (var i = 0; i < this.state.cartOnCheck.length; i++) {
      if (cartOnUpdated.id === this.state.cartOnCheck[i].id) {
        return i;
      }
    }
  };

  onDeleteCartClick = (
    user,
    cartOnUpdated,
    indexCartOnUpdated,
    indexCartOnChacked
  ) => {
    if (this.state.checkValue[indexCartOnUpdated]) {
      if (
        indexCartOnUpdated === this.state.checkValue.length &&
        indexCartOnChacked !== this.state.cartOnCheck.length
      ) {
        this.state.cartOnCheck.splice(indexCartOnChacked, 1);
        this.state.checkValue.pop();
      } else if (
        indexCartOnChacked === this.state.cartOnCheck.length &&
        indexCartOnUpdated !== this.state.checkValue.length
      ) {
        this.state.cartOnCheck.pop();
        this.state.checkValue.splice(indexCartOnUpdated, 1);
      } else if (
        indexCartOnChacked === this.state.cartOnCheck.length &&
        indexCartOnUpdated === this.state.checkValue.length
      ) {
        this.state.cartOnCheck.pop();
        this.state.checkValue.pop();
      } else if (
        indexCartOnChacked !== this.state.cartOnCheck.length &&
        indexCartOnUpdated !== this.state.checkValue.length
      ) {
        this.state.cartOnCheck.splice(indexCartOnChacked, 1);
        this.state.checkValue.splice(indexCartOnUpdated, 1);
      }
    } else if (!this.state.checkValue[indexCartOnUpdated]) {
      if (indexCartOnUpdated === this.state.checkValue.length) {
        this.state.checkValue.pop();
      } else if (indexCartOnUpdated !== this.state.checkValue.length) {
        this.state.checkValue.splice(indexCartOnUpdated, 1);
      }
    }
    this.setState({});
    axios
      .post(API_URL_AGRISTORE + "/deletecart", [user, cartOnUpdated])
      .then(res => {
        console.log(res);
        alert("cart is deleted");
        this.props.cartModified(res, this.state.cartOnCheck);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDeleteAllCartClick = user => {
    axios
      .post(API_URL_AGRISTORE + "/deleteallcart", user)
      .then(res => {
        console.log(res);
        alert("cart is empty");
        this.props.cartModified(res, []);
        this.setState({
          selectAll: false,
          selectAllCheckValue: false,
          checkValue: [],
          cartOnCheck: []
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onUpdateCartAmountClick = (
    aritmatic,
    user,
    cartOnUpdated,
    indexCartOnUpdated,
    indexCartOnChacked
  ) => {
    if (aritmatic && this.state.checkValue[indexCartOnUpdated]) {
      this.state.cartOnCheck[indexCartOnChacked] = {
        ...cartOnUpdated,
        amount: cartOnUpdated.amount + 1,
        totalPrice: (cartOnUpdated.amount + 1) * cartOnUpdated.price
      };
      this.setState({});
    } else if (!aritmatic && this.state.checkValue[indexCartOnUpdated]) {
      this.state.cartOnCheck[indexCartOnChacked] = {
        ...cartOnUpdated,
        amount: cartOnUpdated.amount - 1,
        totalPrice: (cartOnUpdated.amount - 1) * cartOnUpdated.price
      };
      this.setState({});
    }
    axios
      .post(API_URL_AGRISTORE + "/updatecart", [aritmatic, user, cartOnUpdated])
      .then(res => {
        console.log(res);
        alert("cart is updated");
        this.props.cartModified(res, this.state.cartOnCheck);
      })
      .catch(err => {
        console.log(err);
      });
  };

  preventCartAmountFromZero = index => {
    if (this.state.cart[index].amount === 1) {
      return ["none", "grey"];
    } else {
      return ["all", "rgba(6, 71, 6, 1)"];
    }
  };

  preventCartAmountMoreThanStock = index => {
    if (this.state.cart[index].amount === this.state.cart[index].stokTersedia) {
      return ["none", "grey"];
    } else {
      return ["all", "rgba(6, 71, 6, 1)"];
    }
  };

  onCheckBoxClicked = (
    cartOnUpdated,
    indexCartOnUpdated,
    indexCartOnChacked
  ) => {
    console.log(indexCartOnUpdated);
    this.state.checkValue[indexCartOnUpdated] = !this.state.checkValue[
      indexCartOnUpdated
    ];
    this.forceUpdate();
    if (this.state.checkValue[indexCartOnUpdated]) {
      this.state.cartOnCheck.push(cartOnUpdated);
    } else if (!this.state.checkValue[indexCartOnUpdated]) {
      if (this.state.selectAllCheckValue) {
        this.state.selectAllCheckValue = false;
        this.state.selectAll = false;
      } else if (indexCartOnChacked === this.state.cartOnCheck.length - 1) {
        this.state.cartOnCheck.pop();
      }
      this.state.cartOnCheck.splice(indexCartOnChacked, 1);
    }
    // this.setState({{checkValue[index]} : });
  };

  onSelectAllClicked = () => {
    if (!this.state.selectAllCheckValue) {
      this.state.selectAllCheckValue = true;
      if (!this.state.selectAll) {
        this.state.cartOnCheck = [];
        for (var i = 0; i < this.state.checkValue.length; i++) {
          this.state.checkValue[i] = true;
          this.state.cartOnCheck.push(this.state.cart[i]);
        }
        this.state.selectAll = true;
      } else if (this.state.selectAll) {
        for (var i = 0; i < this.state.checkValue.length; i++) {
          this.state.checkValue[i] = false;
          this.state.cartOnCheck = [];
        }
        this.state.selectAll = false;
      }
    } else if (this.state.selectAllCheckValue) {
      for (var i = 0; i < this.state.checkValue.length; i++) {
        this.state.checkValue[i] = false;
        this.state.cartOnCheck = [];
      }
      this.state.selectAllCheckValue = false;
      this.state.selectAll = false;
    }
    this.setState({});
  };

  checkOutButtonProps = () => {
    if (this.state.cartOnCheck.length > 0) {
      return ["rgba(6, 71, 6, 1)", "all"];
    } else {
      return ["lightgray", "none"];
    }
  };

  onCheckOutClick = (user, cartOnCheck) => {
    // this.props.cartModified({ data: [{ ...user }] }, this.state.cartOnCheck);
    axios
      .post(API_URL_AGRISTORE + "/checkout", [user, cartOnCheck])
      .then(res => {
        console.log(res);
        this.props.cartModified(res, this.state.cartOnCheck);
        alert("checkout on progress");
      })
      .catch(err => {
        alert("checkout gagal");
        console.log(err);
      });
  };

  renderCartList = () => {
    const checkValue = [];
    if (this.props.user.cart.length === 0) {
      return <h3 />;
    } else if (
      !this.state.mappingCartList &&
      this.state.checkValue.length === 0
      // ||
      // this.props.user.cookie
    ) {
      this.state.cart.map(e => {
        checkValue.push(false);
      });
      this.setState({ mappingCartList: true, checkValue });
    } else if (
      (this.state.mappingCartList && this.state.checkValue.length !== 0) ||
      this.props.user.cookie
    ) {
      // this.state.mappingCartList = true;
      return this.state.cart.map((product, index) => {
        return (
          <div className="row" style={{ margin: "0" }} key={index}>
            <div className="col-xs-8">
              <div className="row">
                <input
                  className={"cart" + index}
                  key={index}
                  type="checkbox"
                  value="selectall"
                  checked={this.state.checkValue[index]}
                  onChange={() =>
                    this.onCheckBoxClicked(
                      this.props.user.cart[index],
                      index,
                      this.indexOfCartOnCheck_Updated(
                        this.props.user.cart[index]
                      )
                    )
                  }
                />
                <div
                  className="col"
                  style={{ margin: "0", marginLeft: "1rem" }}
                >
                  <div className="row">
                    <h3>{product.nama}</h3>
                  </div>
                  <div className="row">
                    <h3>
                      Rp.
                      {product.totalPrice}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-4">
              <div
                className="row d-flex justify-content-end"
                style={{ margin: "1vw 0", marginTop: "0" }}
                onClick={() =>
                  this.onDeleteCartClick(
                    this.props.user,
                    this.props.user.cart[index],
                    index,
                    this.indexOfCartOnCheck_Updated(this.props.user.cart[index])
                  )
                }
              >
                <div
                  className="glyphicon glyphicon-trash"
                  style={{
                    fontSize: "1vw",
                    color: "rgba(6, 71, 6, 1)",
                    cursor: "pointer"
                  }}
                />
              </div>
              <div
                className="row d-flex justify-content-end align-items-center"
                style={{ margin: "1vw 0" }}
              >
                <div
                  className="glyphicon glyphicon-minus"
                  style={{
                    fontSize: ".8vw",
                    color: this.preventCartAmountFromZero(index)[1],
                    border:
                      "1px solid " + this.preventCartAmountFromZero(index)[1],
                    borderRadius: "3vw",
                    padding: ".5vw",
                    cursor: "pointer",
                    pointerEvents: this.preventCartAmountFromZero(index)[0]
                  }}
                  onClick={() =>
                    this.onUpdateCartAmountClick(
                      false,
                      this.props.user,
                      this.props.user.cart[index],
                      index,
                      this.indexOfCartOnCheck_Updated(
                        this.props.user.cart[index]
                      )
                    )
                  }
                />
                <div
                  className="d-flex justify-content-center"
                  style={{
                    width: "4rem",
                    borderBottom: "1px solid grey",
                    margin: "0 .4vw"
                  }}
                >
                  <h3>{this.state.cart[index].amount}</h3>
                </div>
                <div
                  className="glyphicon glyphicon-plus"
                  style={{
                    fontSize: ".8vw",
                    color: this.preventCartAmountMoreThanStock(index)[1],
                    border:
                      "1px solid " +
                      this.preventCartAmountMoreThanStock(index)[1],
                    borderRadius: "3vw",
                    padding: ".5vw",
                    cursor: "pointer",
                    pointerEvents: this.preventCartAmountMoreThanStock(index)[0]
                  }}
                  onClick={() =>
                    this.onUpdateCartAmountClick(
                      true,
                      this.props.user,
                      this.props.user.cart[index],
                      index,
                      this.indexOfCartOnCheck_Updated(
                        this.props.user.cart[index]
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        );
      });
    }
  };

  renderCartOnChecked = () => {
    if (this.state.cartOnCheck.length > 0) {
      return this.state.cartOnCheck.map(product => {
        return (
          <div className="row">
            <div className="col-xs-6">
              <h4>
                {product.nama}/{product.amount}
              </h4>
            </div>
            <div className="col-xs-6 d-flex justify-content-end align-items-end">
              <h4>
                Rp.
                {product.totalPrice}
              </h4>
            </div>
          </div>
        );
      });
    }
  };

  renderTotalPriceCartOnChecked = () => {
    var totalPrice = 0;
    if (this.state.cartOnCheck.length > 0) {
      this.state.cartOnCheck.map((product, index) => {
        totalPrice += product.totalPrice;
      });
      return totalPrice;
    } else {
      return 0;
    }
  };

  render() {
    console.log(this.state);
    return (
      <div style={{ height: "100vh" }}>
        <div
          style={{
            marginLeft: "6vw",
            marginTop: "10vh",
            width: "88vw"
          }}
        >
          <div className="col-xs-8" style={{ padding: "0 2vw" }}>
            <div
              className="row"
              style={{
                boxShadow: "1px 1px 2px 2px lightgray",
                margin: "2vw 0",
                padding: "1rem"
              }}
            >
              <input
                type="checkbox"
                value="selectall"
                checked={this.state.selectAllCheckValue}
                onChange={this.onSelectAllClicked}
              />
              <h3 style={{ margin: "0", paddingLeft: "1rem" }}>
                Pilih semua produk
              </h3>
              <h4
                style={{
                  position: "absolute",
                  right: "3vw",
                  margin: "0",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.onDeleteAllCartClick(this.props.user);
                }}
              >
                <b>Hapus Semua</b>
              </h4>
            </div>
            <div
              style={{
                boxShadow: "1px 1px 2px 2px lightgray",
                margin: "2vw 0",
                padding: "1rem"
              }}
            >
              <div className="row" style={{ margin: "0" }}>
                <h3 style={{ margin: "0", paddingLeft: "1rem" }}>
                  Penjual : Agristore
                </h3>
              </div>
              <hr />
              {this.renderCartList()}
            </div>
          </div>
          <div className="col-xs-4" style={{ padding: "2vw 0" }}>
            <h3 style={{ color: "grey" }}>
              <b>Ringkasan Belanja</b>
            </h3>
            <div
              style={{
                boxShadow: "1px 1px 2px 2px lightgray",
                margin: "2vw 0",
                padding: "1rem"
              }}
            >
              {this.renderCartOnChecked()}
              <div className="row">
                <div className="col-xs-6">
                  <h3>
                    <b>Total Harga</b>{" "}
                  </h3>
                </div>
                <div className="col-xs-6 d-flex justify-content-end align-items-end">
                  <h3>
                    <b>
                      Rp.
                      {this.renderTotalPriceCartOnChecked()}
                    </b>
                  </h3>
                </div>
              </div>
              <hr />
              {/* {this.goToCheckOutPage()} */}
              <div style={{ pointerEvents: this.checkOutButtonProps()[1] }}>
                <Link to="/payment">
                  <div
                    className="row justify-content-center align-items-center"
                    style={{
                      background: this.checkOutButtonProps()[0],
                      color: "white",
                      margin: "0",
                      height: "2.5vw",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      this.onCheckOutClick(
                        this.props.user,
                        this.state.cartOnCheck
                      );
                    }}
                  >
                    <h3>Checkout</h3>
                  </div>
                </Link>
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
)(Checkout);
