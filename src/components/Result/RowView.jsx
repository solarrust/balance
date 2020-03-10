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
    let resultCircles = Array.from(document.querySelectorAll(".result-circle"));
    let resultBkg = Array.from(
      document.querySelectorAll(".result-circle__bkg")
    );
    let resultGrades = Array.from(
      document.querySelectorAll(".result-circle__grade")
    );

    resultCircles.map((el, i) => {
      let delay = i + 1;
      let duration = 0.2 * (resultCircles.length - 1);
      el.style.left = `${12.5 * i}%`;
      resultBkg[i].style.opacity = 0;
      resultGrades[i].style.opacity = 0;
      TweenMax.fromTo(
        el,
        0.8,
        {
          width: 0,
          height: 0
          // left: "50%"
        },
        {
          width: `${10 * this.props.grades[i]}vh`,
          height: `${10 * this.props.grades[i]}vh`,
          // left: `${12.5 * i}%`
          delay: delay
        }
      );
      TweenMax.to(resultBkg[i], duration, {
        opacity: 1,
        delay: delay
      });

      TweenMax.fromTo(
        resultGrades[i],
        0.8,
        {
          opacity: 0,
          marginLeft: "1vw"
        },
        {
          opacity: 1,
          marginLeft: 0,
          delay: delay
        }
      );
    });
  };

  render() {
    return (
      <div className="results-wrapper _row">
        {this.props.grades.map((grade, i) => {
          return (
            <div className={"result-circle"} index={i} key={i}>
              <div
                className={"result-circle__bkg"}
                style={{
                  backgroundImage: `linear-gradient(${this.props.items[i].bkg})`
                }}
              />
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
