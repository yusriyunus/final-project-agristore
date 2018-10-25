import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import AppInit from "./components/appInit.jsx";
import { keepLogin } from "./actioncreators";

const cookies = new Cookies();

class App extends Component {
  componentWillMount() {
    const getCookie = cookies.get("agristore");
    if (getCookie !== undefined) {
      this.props.keepLogin(getCookie);
    } else {
      // this.props.cookieCheked()
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.auth.email !== "" &&
      this.props.auth.email !== newProps.auth.email
    ) {
      cookies.set("agristore", newProps.auth.email, { path: "/" });
    } else if (
      newProps.auth.email === "" &&
      this.props.auth.email !== newProps.auth.email
    ) {
      cookies.remove("agristore");
    }
  }
  render() {
    return <AppInit />;
  }
}

const mapStateToProps = globalState => {
  const auth = globalState.auth;
  return { auth };
};

export default withRouter(
  connect(
    mapStateToProps,
    { keepLogin }
  )(App)
);
