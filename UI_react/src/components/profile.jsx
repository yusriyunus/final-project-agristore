import React, { Component } from "react";
import axios from "axios";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
import { connect } from "react-redux";
import Footer from "./footer";

class Profile extends Component {
  state = { history: [] };

  componentWillMount() {
    if (this.props.auth.email !== "") {
      alert("hallo");
      this.getHistoryTransaction(this.props);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.auth.email !== "") {
      alert("hai");
      this.getHistoryTransaction(newProps);
    }
  }

  getHistoryTransaction = props => {
    return axios
      .post(API_URL_AGRISTORE + "/gethistorytransaction", props["auth"])
      .then(res => {
        console.log(res);
        this.setState({ history: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderHistoryTransaction = () => {
    if (this.state.history.length > 0) {
      return this.state.history.map((transaction, index) => {
        var {
          nama,
          category,
          harga,
          jumlah,
          totalPrice,
          kurir,
          alamat,
          tanggal,
          waktu
        } = transaction;
        return (
          <tr>
            <td>
              <h3>{index + 1}</h3>
            </td>
            <td>
              <h3>{nama}</h3>
            </td>
            <td>
              <h3>{category}</h3>
            </td>
            <td>
              <h3>
                Rp.
                {harga}
              </h3>
            </td>
            <td>
              <h3>{jumlah}</h3>
            </td>
            <td>
              <h3>
                Rp.
                {totalPrice}
              </h3>
            </td>
            <td>
              <h3>{kurir}</h3>
            </td>
            <td>
              <h3>{alamat}</h3>
            </td>
            <td>
              <h3>{tanggal}</h3>
            </td>
            <td>
              <h3>{waktu}</h3>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div style={{ margin: "4vw" }}>
        <style>
          {"td,th{border:1px solid black;padding:1vw;width:auto !important}"}
        </style>
        <div
          className="d-flex justify-content-center"
          style={{ padding: "2vw" }}
        >
          <b>
            <h1>Detail Transaksi</h1>
          </b>
        </div>
        <div className="d-flex justify-content-center">
          <div>
            <table>
              <tr>
                <th>
                  <h3>
                    <b>No.</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Nama Produk</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Category</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Harga Satuan</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Jumlah</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Total Harga</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Kurir</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Alamat</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Tanggal</b>
                  </h3>
                </th>
                <th>
                  <h3>
                    <b>Waktu</b>
                  </h3>
                </th>
              </tr>
              {this.renderHistoryTransaction()}
            </table>
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

export default connect(mapStateToProps)(Profile);
