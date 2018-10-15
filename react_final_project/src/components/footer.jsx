import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div
        className="row"
        style={{
          height: "10vh",
          background: "white",
          borderTop: "1.6px solid rgba(6, 71, 6, 0.9)",
          width: "100vw",
          margin: "0 0 -4vw -4vw",
          position: "absolute",
          bottom: "-3vw",
          padding: "5px 4vw"
        }}
      >
        <div
          className="col d-flex align-items-end"
          style={{ display: "inline" }}
        >
          <h2
            className="glyphicon glyphicon-grain"
            style={{ color: "rgba(6, 71, 6, 0.9)" }}
          />
          <h3>Agri Store </h3>
          <h6> &nbsp; &copy; 2018 : HAK CIPTA DILINDUNGI</h6>
        </div>
        <div
          className="col d-flex justify-content-end align-items-end"
          style={{ display: "inline" }}
        >
          <h4>
            <i>Find Us :</i>
          </h4>
          <h2>
            &nbsp;
            <a className="fa fa-facebook" />
            &nbsp;
            <a className="fa fa-twitter" />
            &nbsp;
            <a className="fa fa-instagram" />
            &nbsp;
            <a className="fa fa-linkedin" />
          </h2>
        </div>
      </div>
    );
  }
}

export default Footer;
