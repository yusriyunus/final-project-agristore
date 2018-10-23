import React, { Component } from "react";

class Rating extends Component {
  state = {
    // starOnClick: this.props.ratingDefault
  };

  // componentWillReceiveProps(newProps) {
  //   this.setState({ starOnClick: 0 });
  // }

  // starOnClick = count => {
  //   this.setState({ starOnClick: count });
  // };

  renderStar = () => {
    var star = [];
    if (this.props.starCount === 0) {
      for (let i = 1; i <= 5; i++) {
        star.push(
          <i
            key={i}
            className="glyphicon glyphicon-star-empty"
            style={{ color: "gold", fontSize: "1.5vw", cursor: "pointer" }}
            onClick={() => {
              this.props.starOnClick(i);
            }}
          />
        );
      }
      return star;
    } else {
      for (let j = 1; j <= 5; j++) {
        if (j <= this.props.starCount) {
          star.push(
            <i
              key={j}
              className="glyphicon glyphicon-star"
              style={{ color: "gold", fontSize: "1.5vw", cursor: "pointer" }}
              onClick={() => {
                this.props.starOnClick(j);
              }}
            />
          );
        } else {
          star.push(
            <i
              key={j}
              className="glyphicon glyphicon-star-empty"
              style={{ color: "gold", fontSize: "1.5vw", cursor: "pointer" }}
              onClick={() => {
                this.props.starOnClick(j);
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
