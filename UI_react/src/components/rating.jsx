import React, { Component } from "react";
import "./css/star.css";

class Rating extends Component {
  renderStar = () => {
    var star = [];
    if (this.props.starCount === 0) {
      for (let i = 1; i <= 5; i++) {
        star.push(
          <i
            key={i}
            className="glyphicon glyphicon-star-empty"
            style={{
              color: "gold",
              fontSize: this.props.fontSize,
              cursor: "pointer",
              pointerEvents: this.props.pointerEvents
            }}
            onClick={() => {
              this.props.starOnClick(i);
            }}
          />
        );
      }
      return star;
    } else if (this.props.starCount % 1 === 0) {
      for (let j = 1; j <= 5; j++) {
        if (j <= this.props.starCount) {
          star.push(
            <i
              key={j}
              className="glyphicon glyphicon-star"
              style={{
                color: this.props.color || "gold",
                fontSize: this.props.fontSize,
                cursor: "pointer",
                pointerEvents: this.props.pointerEvents
              }}
              onClick={() => {
                this.props.starOnClick(j);
              }}
            />
          );
        } else {
          star.push(
            <i
              key={j}
              className="glyphicon glyphicon-star"
              style={{
                color: "#bdc3c7",
                fontSize: this.props.fontSize,
                cursor: "pointer",
                pointerEvents: this.props.pointerEvents
              }}
              onClick={() => {
                this.props.starOnClick(j);
              }}
            />
          );
        }
      }
      return star;
    } else if (this.props.starCount % 1 !== 0) {
      for (let k = 1; k <= 5; k++) {
        if (k < this.props.starCount) {
          // alert("rating berkoma");
          star.push(
            <i
              key={k}
              className="glyphicon glyphicon-star"
              style={{
                color: this.props.color || "gold",
                fontSize: this.props.fontSize,
                cursor: "pointer",
                pointerEvents: this.props.pointerEvents
              }}
              onClick={() => {
                this.props.starOnClick(k);
              }}
            />
          );
        } else if (k === Math.ceil(this.props.starCount)) {
          // alert("rating berkoma lagi");
          star.push(
            <i
              key={k}
              className="glyphicon glyphicon-star half"
              style={{
                color: this.props.color || "gold",
                fontSize: this.props.fontSize,
                cursor: "pointer",
                pointerEvents: this.props.pointerEvents
              }}
              onClick={() => {
                this.props.starOnClick(k);
              }}
            />
          );
        } else {
          star.push(
            <i
              key={k}
              className="glyphicon glyphicon-star"
              style={{
                color: "#bdc3c7",
                fontSize: this.props.fontSize,
                cursor: "pointer",
                pointerEvents: this.props.pointerEvents
              }}
              onClick={() => {
                this.props.starOnClick(k);
              }}
            />
          );
        }
      }
      return star;
    }
  };

  render() {
    console.log(this.props.starCount);
    return (
      <div className="row" style={{ margin: 0, padding: 0 }}>
        {this.renderStar()}
      </div>
    );
  }
}

export default Rating;
