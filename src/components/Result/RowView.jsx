import React, { Component } from "react";
import { TweenMax } from "gsap";

class RowView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.innerAnimation();
  }

  innerAnimation = () => {
    let resultCircles = Array.from(
      document.querySelectorAll(".results-wrapper > div")
    );

    resultCircles.map((el, i) => {
      TweenMax.fromTo(
        el,
        0.5 * (resultCircles.length - 1),
        { width: 0, height: 0, left: "50%" },
        {
          width: `${7.96 * this.props.grades[i]}vmin`,
          height: `${7.96 * this.props.grades[i]}vmin`,
          left: `${12.5 * i}%`
        }
      );
    });
  };

  render() {
    return (
      <div className="results-wrapper _row">
        {this.props.grades.map((grade, i) => {
          return (
            <div
              className={"result-circle"}
              style={{
                backgroundImage: `linear-gradient(${this.props.items[i].bkg})`
              }}
              index={i}
              key={i}
            >
              <div className="result-circle__name">
                {this.props.items[i].sphere}
              </div>
              <div className="result-circle__grade">{grade}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RowView;
