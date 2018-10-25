import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { onRegister } from "../actioncreators";
import "./css/loginpage.css";

class RegisterPage extends Component {
  state = {};

  onRegisterClick = () => {
    this.props.onRegister({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    });
    // this.props.display("none");
  };

  render() {
    if (this.props.auth.username === "" || this.props.auth.cookie) {
      return (
        <div>
          <div
            id="popUp"
            className="login-background"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              zIndex: "1",
              width: 100 + "%"
            }}
          >
            <div className="container">
              <div className="login-form">
                <div
                  id="close_tag"
                  className="close"
                  style={{
                    marginRight: 36 + "rem",
                    marginTop: 0.5 + "rem",
                    transform: "rotate(45deg)"
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
                    <p style={{ margin: 0 }}>Fill this form below</p>
                  </div>
                  <form id="Login">
                    <div className="form-group">
                      <input
                        ref="username"
                        type="username"
                        className="form-control"
                        id="inputUsername"
                        placeholder="Username"
                      />
                    </div>
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
                    <div className="form-group">
                      <input
                        ref="retypepassword"
                        type="password"
                        className="form-control"
                        id="inputRetypePassword"
                        placeholder="Retype-Password"
                      />
                    </div>
                    <input
                      id="input"
                      type="button"
                      className="btn btn-primary"
                      value="Join Us"
                      onClick={this.onRegisterClick}
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

const mapStateToProps = globalstate => {
  return { auth: globalstate.auth };
};

export default connect(
  mapStateToProps,
  { onRegister }
)(RegisterPage);
