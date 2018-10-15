import React, { Component } from "react";
import axios from "axios";
import { API_URL_AGRISTORE } from "../supports/apiurl/apiurl";
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

  // GET PRODUCT FROM DB FUNCTION//
  categoryOnClick = category => {
    console.log(category);
    if (this.state[category].length === 0) {
      axios
        .get(API_URL_AGRISTORE + `/${category}`)
        .then(res => {
          this.state[category] = res.data;
          this.setState();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  /////////////////////////////////

  // PAGE SLIDER FUNCTION //
  geser = (a, b) => {
    document
      .getElementById("slider")
      .setAttribute(
        "style",
        "margin-left:" +
          a +
          "vw; transition:margin-top .4s; margin-Top:" +
          b +
          "vh"
      );
  };
  margin = {
    Default: (a, b = 0, c = 0) => {
      this.geser(a, b, c);
    }
  };
  ///////////////////////

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
    // console.log(this.state);
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
            style={{ width: 92 + "vw", height: 50 + "vw", marginLeft: "4vw" }}
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
            marginLeft: "-400vw",
            marginTop: "-100vh"
          }}
        >
          <div>
            <CCTlist margin={this.margin} productList={this.state.cct} />
          </div>
          <div>
            <Vegetablelist margin={this.margin} />
          </div>
          <div>
            <Fruitlist margin={this.margin} />
          </div>
          <div>
            <Spicelist margin={this.margin} />
          </div>
          <div>
            <Productscategory
              margin={this.margin}
              categoryOnClick={this.categoryOnClick}
            />
          </div>
          <div>
            <Toplist margin={this.margin} />
          </div>
          <div>
            <Hotlist margin={this.margin} />
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
