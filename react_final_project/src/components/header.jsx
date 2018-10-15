import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onLogOut } from "../actioncreators";
import {
  Button,
  Collapse,
  FormGroup,
  Label,
  CustomInput,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Loginpage from "./loginpage";
import Registerpage from "./registerpage";

class Header extends Component {
  state = {
    isOpen: false,
    displayLogin: "none",
    displayRegister: "none",
    cart: this.props.auth.cart,
    amount: 0
  };

  componentWillReceiveProps(newProps) {
    var amount = 0;
    this.cartAmount = () => {
      newProps.auth.cart.map(product => {
        return (amount += product.amount);
      });
      return amount;
    };
    if (newProps.auth.error === "" && newProps.auth.username !== "") {
      this.setState({
        displayLogin: "none",
        displayRegister: "none"
      });
      // alert("login succes");
    }
    if (newProps.auth.cart !== this.props.auth.cart) {
      this.setState({ cart: newProps.auth.cart, amount: this.cartAmount() });
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  renderCartList = () => {
    console.log(this.state.cart, "cart");
    return this.state.cart.map((product, index) => {
      return (
        <div key={index} className="d-flex justify-content-center">
          <h3>{product.nama}</h3>
        </div>
      );
    });
  };

  onLogOutClick = () => {
    this.setState({
      displayLogin: "none",
      displayRegister: "none"
    });
    this.props.onLogOut();
  };
  loginClick = x => {
    this.setState({ displayLogin: x });
  };
  registerClick = x => {
    this.setState({ displayRegister: x });
  };
  fnCloseLogin = x => {
    this.setState({ displayLogin: x });
  };
  fnCloseRegister = x => {
    this.setState({ displayRegister: x });
  };

  render() {
    if (this.props.auth.username === "") {
      // console.log(this.state.isOpen);
      return (
        <div className="fixed-top" style={{ background: "rgba(6, 71, 6, 1)" }}>
          <div
            id="login"
            style={{
              display: this.state.displayLogin,
              zIndex: "1"
            }}
          >
            <Loginpage display={x => this.fnCloseLogin(x)} />
          </div>
          <div id="register" style={{ display: this.state.displayRegister }}>
            <Registerpage display={x => this.fnCloseRegister(x)} />
          </div>
          <Navbar
            className="d-flex justify-content-center"
            light
            expand="md"
            style={{ margin: 0, height: "60px" }}
          >
            <Nav className="row" href="/" style={{ paddingLeft: "25px" }}>
              <Link to="/">
                <i
                  className="glyphicon glyphicon-grain"
                  style={{ fontSize: "2.5rem", color: "white" }}
                />
                <h1
                  style={{
                    color: "white",
                    margin: 0,
                    display: "inline"
                  }}
                >
                  Agri Store
                </h1>
              </Link>
            </Nav>
            <div
              className="row "
              style={{
                position: "absolute",
                background: "white",
                borderColor: "white",
                padding: "3px",
                paddingLeft: "12px",
                borderRadius: "4px"
              }}
            >
              <input
                type="text"
                placeholder="Search product..."
                name="search"
                style={{
                  width: "15vw",
                  margin: 0,
                  fontSize: "1.4rem",
                  borderColor: "white",
                  borderWidth: 0
                }}
              />
              <FormGroup
                style={{
                  margin: "0"
                }}
              >
                {/* <Label for="exampleSelect">Select</Label> */}
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                  style={{
                    fontSize: "1.2rem",
                    height: "3rem",
                    borderWidth: "0",
                    textAlign: "right",
                    paddingRight: "25px",
                    paddingLeft: "0"
                  }}
                >
                  <option value="">Select Category</option>
                  <option>Cofffee, Cocoa, and Tea</option>
                  <option>Vegetable</option>
                  <option>Fruit</option>
                  <option>Spice</option>
                </CustomInput>
              </FormGroup>
              <div
                className="btn btn-light"
                size="lg"
                style={{ margin: 0, display: "inline" }}
              >
                <i
                  className="glyphicon glyphicon-search"
                  style={{ fontSize: "1.8rem" }}
                />
              </div>
            </div>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <h3
                      className="glyphicon glyphicon-shopping-cart"
                      style={{ color: "white", transform: "scaleX(-1)" }}
                    />
                    <h6
                      style={{
                        display: "inline",
                        background: "white",
                        borderRadius: "100px",
                        padding: "1px 5px",
                        color: "black"
                      }}
                    >
                      <b>{this.state.amount}</b>
                    </h6>
                  </DropdownToggle>
                  <DropdownMenu
                    right
                    style={{
                      padding: "0.3vw"
                      // boxShadow: "1px 1px 2px 2px lightgray"
                    }}
                  >
                    <div
                      className="d-flex justify-content-center"
                      style={{
                        borderRadius: ".2vw",
                        background: "white",
                        width: "30vw",
                        height: "30vw",
                        position: "relative"
                      }}
                    >
                      <div
                        className="d-flex justify-content-center"
                        style={{ padding: "1vw 0" }}
                      >
                        <h1 style={{ color: "gray" }}>Keranjang Belanja</h1>
                      </div>
                      {this.renderCartList()}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "1vw"
                        }}
                      >
                        <Link to="/checkout">
                          <DropdownItem style={{ padding: "0" }}>
                            <div
                              onClick={this.toggle}
                              className="btn btn-success"
                            >
                              <h4>Go to Checkout Page</h4>
                            </div>
                          </DropdownItem>
                        </Link>
                      </div>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem
                  id="loginButton"
                  onClick={() => this.loginClick("flex")}
                >
                  <NavLink>
                    <h3
                      style={{
                        color: "white",
                        cursor: "pointer"
                      }}
                    >
                      Sign In
                    </h3>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <h3
                      style={{
                        border: "1px solid white",
                        height: "25px",
                        width: "1px"
                      }}
                    />
                  </NavLink>
                </NavItem>
                <NavItem
                  id="registerButton"
                  onClick={() => this.registerClick("flex")}
                >
                  <NavLink>
                    <h3 style={{ color: "white", cursor: "pointer" }}>Join</h3>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            {/* <NavbarToggler onClick={this.toggle} /> */}
          </Navbar>
        </div>
      );
    }
    return (
      <div className="fixed-top" style={{ background: "rgba(6, 71, 6, 1)" }}>
        <div
          id="login"
          style={{
            display: this.state.displayLogin,
            zIndex: "1"
          }}
        >
          <Loginpage display={x => this.fnCloseLogin(x)} />
        </div>
        <div id="register" style={{ display: this.state.displayRegister }}>
          <Registerpage display={x => this.fnCloseRegister(x)} />
        </div>
        <Navbar
          className="d-flex justify-content-center"
          light
          expand="md"
          style={{ margin: 0, height: "60px" }}
        >
          <Nav className="row" href="/" style={{ paddingLeft: "25px" }}>
            <Link to="/">
              <i
                className="glyphicon glyphicon-grain"
                style={{ fontSize: "2.5rem", color: "white" }}
              />
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  display: "inline"
                }}
              >
                Agri Store
              </h1>
            </Link>
          </Nav>
          <div
            className="row "
            style={{
              position: "absolute",
              background: "white",
              borderColor: "white",
              padding: "3px",
              paddingLeft: "12px",
              borderRadius: "4px"
            }}
          >
            <input
              type="text"
              placeholder="Search product..."
              name="search"
              style={{
                width: "15vw",
                margin: 0,
                fontSize: "1.4rem",
                borderColor: "white",
                borderWidth: 0
              }}
            />
            <FormGroup
              style={{
                margin: "0"
              }}
            >
              {/* <Label for="exampleSelect">Select</Label> */}
              <CustomInput
                type="select"
                id="exampleCustomSelect"
                name="customSelect"
                style={{
                  fontSize: "1.2rem",
                  height: "3rem",
                  borderWidth: "0",
                  textAlign: "right",
                  paddingRight: "25px",
                  paddingLeft: "0"
                }}
              >
                <option value="">Select Category</option>
                <option>Cofffee, Cocoa, and Tea</option>
                <option>Vegetable</option>
                <option>Fruit</option>
                <option>Spice</option>
              </CustomInput>
            </FormGroup>
            <div
              className="btn btn-light"
              size="lg"
              style={{ margin: 0, display: "inline" }}
            >
              <i
                className="glyphicon glyphicon-search"
                style={{ fontSize: "1.8rem" }}
              />
            </div>
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <h3
                    className="glyphicon glyphicon-shopping-cart"
                    style={{ color: "white", transform: "scaleX(-1)" }}
                  />
                  <h6
                    style={{
                      display: "inline",
                      background: "white",
                      borderRadius: "100px",
                      padding: "1px 5px",
                      color: "black"
                    }}
                  >
                    <b>{this.state.amount}</b>
                  </h6>
                </DropdownToggle>
                <DropdownMenu
                  right
                  style={{
                    padding: "0.3vw",
                    boxShadow: "1px 1px 2px 2px lightgray"
                  }}
                >
                  <div
                    style={{
                      borderRadius: ".2vw",
                      background: "white",
                      width: "30vw",
                      height: "30vw",
                      position: "relative"
                    }}
                  >
                    <div
                      className="d-flex justify-content-center"
                      style={{ padding: "1vw 0" }}
                    >
                      <h1 style={{ color: "gray" }}>Keranjang Belanja</h1>
                    </div>
                    {this.renderCartList()}
                  </div>
                  <div className="row d-flex justify-content-center align-items-center">
                    <Link to="/checkout">
                      <DropdownItem style={{ padding: "0" }}>
                        <div onClick={this.toggle} className="btn btn-success">
                          <h4>Go to Checkout Page</h4>
                        </div>
                      </DropdownItem>
                    </Link>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ height: "1vw" }}>
                  <h3 style={{ color: "white" }}>
                    <i>Welcome, {this.props.auth.username}</i>
                  </h3>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <h4>Profile</h4>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onLogOutClick}>
                    <h4>Logout</h4>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          <NavbarToggler onClick={this.toggle} />
        </Navbar>
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
  { onLogOut }
)(Header);
