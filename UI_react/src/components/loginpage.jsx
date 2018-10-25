import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { onLogin } from "../actioncreators";
import "./css/loginpage.css";
class LoginPage extends Component {
  state = {};

  onLoginClick = () => {
    this.props.onLogin({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
    // this.props.display("none");
  };

  render() {
    if (this.props.auth.email === "" || this.props.auth.cookie) {
      return (
        <div>
          <div
            id="popup"
            className="login-background"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "0",
              width: "100%",
              zIndex: "1"
            }}
          >
            <div className="container">
              <div className="login-form">
                <div
                  id="closetag"
                  className="close"
                  style={{
                    marginRight: 36 + "rem",
                    marginTop: 0.5 + "rem",
                    transform: "rotate(45deg)"
                  }}
                  onClick={() => {
                    {
                      this.props.display("none");
                    }
                  }}
                >
                  <h1>+</h1>
                </div>
                <div className="main-div">
                  <div className="panel">
                    <h2
                      className="glyphicon glyphicon-grain"
                      style={{ color: "rgba(6, 71, 6, 1)" }}
                    />
                    <h2 style={{ display: "inline" }}>Agri Store</h2>
                    <p>Please enter your email and password</p>
                  </div>
                  <form id="Login">
                    <div className="form-group">
                      <input
                        ref="email"
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        ref="password"
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                      />
                    </div>
                    <div className="forgot">
                      <a href="reset.html">Forgot password?</a>
                    </div>
                    <input
                      type="button"
                      className="btn btn-primary"
                      value="Sign In"
                      onClick={this.onLoginClick}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <Redirect to="/" />;
  }
}

const mapStateToProps = globalState => {
  const auth = globalState.auth;

  return { auth };
};

export default connect(
  mapStateToProps,
  { onLogin }
)(LoginPage);
