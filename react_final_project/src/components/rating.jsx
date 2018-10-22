import React, { Component } from "react";

class Rating extends Component {
  state = {
    starOnClick: this.props.ratingDefault
  };

  componentWillReceiveProps(newProps) {
    this.setState({ starOnClick: 0 });
  }

  starOnClick = count => {
    this.setState({ starOnClick: count });
  };

  renderStar = () => {
    var star = [];
    if (this.state.starOnClick === 0) {
      for (let i = 1; i <= 5; i++) {
        star.push(
          <i
            key={i}
            className="glyphicon glyphicon-star-empty"
            style={{ color: "gold", fontSize: "1.5vw", cursor: "pointer" }}
            onClick={() => {
              this.starOnClick(i);
            }}
          />
        );
      }
      return star;
    } else {
      for (let j = 1; j <= 5; j++) {
        if (j <= this.state.starOnClick) {
          star.push(
            <i
              key={j}
              className="glyphicon glyphicon-star"
              style={{ color: "gold", fontSize: "1.5vw", cursor: "pointer" }}
              onClick={() => {
                this.starOnClick(j);
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
                this.starOnClick(j);
              }}
            />
          );
        }
      }
      return star;
    }
  };

  render() {
    console.log(this.state.starOnClick);
    return (
      <div className="row" style={{ margin: 0, padding: 0 }}>
        {this.renderStar()}
      </div>
    );
  }
}

export default Rating;
