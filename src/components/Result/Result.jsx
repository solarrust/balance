import React, { Component } from "react";
import data from "../../data.json";
import { TweenMax } from "gsap";

const { questions } = data;

// TODO: заглушка для страницы результатов, когда тест не пройден
// TODO: заменить иконку на кнопке вида "в столбик" на правильную

class Result extends Component {
  constructor(props) {
    super(props);
    this.grades = localStorage.getItem("grades").split("/");
    this.state = {
      view: "row-view"
    };
  }

  componentDidMount() {
    this.grades = localStorage.getItem("grades").split("/");
    this.innerAnimation();
    this.onSwitch();
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
          width: `${7.96 * this.grades[i]}vmin`,
          height: `${7.96 * this.grades[i]}vmin`,
          left: `${12.5 * i}%`
        }
      );
    });
  };

  onSwitch = () => {
    this.setState({
      view: this.state.view === "row-view" ? "col-view" : "row-view"
    });

    document.getElementById(this.state.view).checked = true;
  };

  render() {
    return (
      <div className="main results page">
        <div className="view-icons" onChange={this.onSwitch}>
          <span className="view-icons__text">view:</span>
          <input
            className="view-icon _row"
            type={"radio"}
            name={"view"}
            id={"row-view"}
          />
          <label htmlFor={"row-view"} className="view-icon__label">
            row view
          </label>
          <input
            className="view-icon _col"
            type={"radio"}
            name={"view"}
            id={"col-view"}
          />
          <label htmlFor={"col-view"} className="view-icon__label">
            column view
          </label>
        </div>
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
