import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import Productscategory from "./productscategory";
import CCTlist from "./listCCT";
import Vegetablelist from "./listvegetable";
import Fruitlist from "./listfruit";
import Spicelist from "./listspice";
import Toplist from "./listtop";
import Hotlist from "./listhot";
import Grandpa from "./pics/home1(2).jpeg";
import Granddaughter from "./pics/model(3).jpeg";

const items = [
  {
    src: Grandpa
  },
  {
    src: Granddaughter
  }
];

class Example extends Component {
  state = { activeIndex: 0, cct: [], fruits: [], vegetables: [], spices: [] };

  componentWillReceiveProps(newProps) {
    if (newProps.margin !== this.props.margin) {
      document.getElementById("slider").style.transition = "margin-top .6s";
    }
    if (
      newProps.products !== this.props.products &&
      newProps.products.searchClick
    ) {
      const { cct, vegetables, fruits, spices } = newProps.products;
      this.setState({ cct, vegetables, fruits, spices });
    }
    if (
      newProps.products !== this.props.products &&
      !newProps.products.searchClick
    ) {
      const { cct, vegetables, fruits, spices } = newProps.products;
      this.setState({ cct, vegetables, fruits, spices });
    }
  }

  // CAROUSEL FUNCTION //
  onExiting = () => {
    this.animating = true;
  };
  onExited = () => {
    this.animating = false;
  };
  next = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };
  previous = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };
  ////////////////////////////////

  render() {
    console.log(this.state.cct);
    const { activeIndex } = this.state;
    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img
            src={item.src}
            alt={item.altText}
            style={{ width: 92 + "vw", height: 45 + "vw", marginLeft: "4vw" }}
          />
        </CarouselItem>
      );
    });

    return (
      <div style={{ marginBottom: "2.5vw" }}>
        {/* <Header /> */}
        <div
          style={{
            marginTop: "5vw"
          }}
        >
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
            ride="carousel"
            pause={false}
            interval="6000"
          >
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Carousel>
        </div>
        <div
          id="slider"
          style={{
            marginLeft: this.props.margin.marginLeft,
            marginTop: this.props.margin.marginTop
          }}
        >
          <div>
            <CCTlist
              pageOnSliding={this.props.pageOnSliding}
              productList={this.state.cct}
            />
          </div>
          <div>
            <Vegetablelist pageOnSliding={this.props.pageOnSliding} />
          </div>
          <div>
            <Fruitlist pageOnSliding={this.props.pageOnSliding} />
          </div>
          <div>
            <Spicelist pageOnSliding={this.props.pageOnSliding} />
          </div>
          <div>
            <Productscategory
              pageOnSliding={this.props.pageOnSliding}
              // margin={this.margin}
              // categoryOnClick={this.categoryOnClick}
            />
          </div>
          <div>
            <Toplist pageOnSliding={this.props.pageOnSliding} />
          </div>
          <div>
            <Hotlist pageOnSliding={this.props.pageOnSliding} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  const products = globalState.products;
  return { products };
};

export default connect(mapStateToProps)(Example);
