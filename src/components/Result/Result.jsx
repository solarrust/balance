import React, { Component } from "react";
import data from "../../data.json";
import { Power1, TweenMax } from "gsap";
import { duration } from "moment";

const { questions } = data;

class Result extends Component {
  constructor(props) {
    super(props);
    this.grades = localStorage.getItem("grades").split("/");
  }

  componentDidMount() {
    this.grades = localStorage.getItem("grades").split("/");
    this.innerAnimation();
  }

  innerAnimation = () => {
    let resultCircles = Array.from(
      document.querySelectorAll(".results-wrapper > div")
    );

    resultCircles.map((el, i) => {
      console.log(i / 10 + 5);
      TweenMax.fromTo(
        el,
        0.5 * (resultCircles.length - 1),
        { width: 0, height: 0, left: "50%" },
        {
          width: `${7.96 * this.grades[i]}vmin`,
          height: `${7.96 * this.grades[i]}vmin`,
          left: `${12.5 * i}%`
        }
      );
    });
  };

  render() {
    return (
      <div className="main results page">
        <div className="results-wrapper">
          {this.grades.map((grade, i) => {
            return (
              <div
                className={"result-circle"}
                style={{
                  backgroundImage: `linear-gradient(${questions[i].bkg})`
                }}
                index={i}
                key={i}
              >
                <div className="result-circle__name">{questions[i].sphere}</div>
                <div className="result-circle__grade">{grade}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Result;
