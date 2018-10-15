import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import "./css/app.css";
import Home from "./home";
import Header from "./header";
import Checkout from "./checkout";
import Payment from "./payment";
import LoginPage from "./loginpage";
import RegisterPage from "./registerpage";

class AppInit extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <Switch> */}
        <Route exact path="/" component={Home} />
        {/* <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} /> */}
        {/* </Switch> */}
        <Route
          path="/checkout"
          render={() => <Checkout user={this.props.auth} />}
        />
        <Route path="/payment" component={Payment} />
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  const auth = globalState.auth;
  return { auth };
};

export default withRouter(connect(mapStateToProps)(AppInit));
