import React, { Component } from "react";
import { connect } from "react-redux";
import loading from "../components/pics/loading.gif";
import GridCategory from "./gridcategory";
import Sidebar from "./sidebar";

class CCTlist extends Component {
  state = {
    sidebarProp: {
      title: "CCT",
      detail: "/Coffee, Cocoa, Tea",
      font: "white"
    },
    gridProp: {
      color: "rgba(0,0,0,0.65)"
    },
    displayDetail: "none",
    productList: this.props.productList,
    filterStatus: false,
    sortStatus: false,
    productFilter: [],
    productOnClick: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.productList.length !== 0) {
      this.setState({ productList: newProps.productList });
    }
  }

  onfilterClick = filterBy => {
    console.log(filterBy);
    var newList = [];
    this.props.productList.map(product => {
      if (product.lokasiPengirim === filterBy) {
        newList.push(product);
      }
    });
    this.setState({ productList: newList, filterStatus: true });
  };

  onSortClick = index => {
    if (index === 3) {
      this.state.productList.sort((x, y) => {
        return x.price - y.price;
      });
    } else if (index === 4) {
      this.state.productList.sort((x, y) => {
        return y.price - x.price;
      });
    }
    this.setState({ sortStatus: true });
  };

  onDetailClick = index => {
    this.setState({
      displayDetail: "flex",
      productOnClick: this.state.productList[index]
    });
  };

  onCloseClick = () => {
    this.setState({
      displayDetail: "none"
    });
  };

  onDeleteAllClick = () => {
    alert("hapus semua");
    this.setState({
      productFilter: [],
      productList: this.props.productList,
      filterStatus: false,
      sortStatus: false
    });
  };

  renderProductList = () => {
    if (
      // !this.state.sortStatus ||
      this.props.productList.length !== 0
      // && !this.state.filterStatus)
    ) {
      alert("sort sebelum filter");
      return this.state.productList.map((product, index) => {
        return (
          <GridCategory
            key={index}
            background={this.state.gridProp.color}
            onDetailClick={() => this.onDetailClick(index)}
            product={product.nama}
            harga={product.price}
          />
        );
      });
    }
    // if (
    //   this.state.sortStatus ||
    //   (this.state.productFilter.length !== 0 && this.state.filterStatus)
    // ) {
    //   alert("sort setelah filter");
    //   return this.state.productFilter.map((product, index) => {
    //     return (
    //       <GridCategory
    //         key={index}
    //         background={this.state.gridProp.color}
    //         onDetailClick={() => this.onDetailClick(index)}
    //         product={product.nama}
    //         harga={product.price}
    //       />
    //     );
    //   });
    // }
    else if (
      this.state.productList.length === 0 &&
      (this.state.filterStatus || this.state.sortStatus)
    ) {
      return (
        <GridCategory
          background={this.state.gridProp.color}
          onDetailClick={this.onDetailClick}
          product="Product Tidak Tersedia"
          harga="-"
        />
      );
    } else if (
      this.state.productList.length === 0 ||
      (!this.state.filterStatus || !this.state.sortStatus)
    ) {
      return (
        <GridCategory
          background={this.state.gridProp.color}
          onDetailClick={this.onDetailClick}
          product={
            <img src={loading} style={{ width: "4vw", height: "auto" }} />
          }
          harga="0"
        />
      );
    }
  };

  render() {
    console.log(this.state);
    const { Default } = this.props.margin;
    return (
      <div className="sliderPage" style={{}}>
        <div className="row" style={{ margin: 0 }}>
          <div style={{}}>
            <Sidebar
              sidebarProp={this.state.sidebarProp}
              display={this.state.displayDetail}
              productOnClick={this.state.productOnClick}
              onCloseClick={this.onCloseClick}
              user={this.props.auth}
              sorting={this.onSortClick}
              filter={this.onfilterClick}
              deleteAll={this.onDeleteAllClick}
            />
          </div>
          <div
            className="col-lg-9"
            style={{
              padding: 0,
              margin: 0,
              background: "aliceblue",
              height: 100 + "%"
            }}
          >
            <div style={{ position: "sticky", top: "5vw", zIndex: "2" }}>
              <div
                className="row justify-content-center"
                style={{
                  padding: "0",
                  marginTop: "-10px"
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{
                    color: "white",
                    background: this.state.gridProp.color,
                    padding: "2px 10px",
                    borderRadius: "10px",
                    cursor: "pointer"
                    // zIndex: 1
                  }}
                  onClick={() => {
                    Default(-400, -100, 0.3);
                  }}
                >
                  <h3 className="glyphicon glyphicon-th" />
                  <h4 style={{ display: "inline", padding: "0 10px" }}>
                    Product Categories
                  </h4>
                  <h5 className="glyphicon glyphicon-share-alt" />
                </div>
              </div>
            </div>
            <div
              className="row justify-content-center"
              style={{ margin: "0 10px" }}
            >
              {this.renderProductList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  const auth = globalState.auth;
  return { auth };
};

export default connect(mapStateToProps)(CCTlist);
