import React, { Component } from "react";
import { Link } from "react-router-dom";
import Arrow from "../SVG/Arrow";
import { TweenMax } from "gsap";

let numbers;
let customCursor;

class Question extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    numbers = Array.from(document.querySelectorAll(".grade__item"));
    customCursor = document.querySelector(".cursor");

    this.props.onQuestionChange(this.props.index);
    this.cursorHoverHandler();
  }

  cursorHoverHandler() {
    numbers.forEach(el => {
      el.addEventListener("mouseout", () => {
        TweenMax.fromTo(
          customCursor,
          0.2,
          { width: "7vw", height: "7vw" },
          { width: "42px", height: "42px" }
        );
      });
      el.addEventListener("mouseover", () => {
        TweenMax.fromTo(
          customCursor,
          0.2,
          { width: "42px", height: "42px" },
          { width: "7vw", height: "7vw" }
        );
      });
    });
  }

  render() {
    const grades = [];
    for (let i = 0; i < 10; i++) {
      let classList = "grade__item";
      const choiceClass = "_choice";
      if (
        this.props.grades[this.props.index] &&
        this.props.grades[this.props.index] !== "" &&
        this.props.grades[this.props.index] - 1 == i
      ) {
        classList += ` ${choiceClass}`;
      }
      grades.push(
        <li key={i} className={classList}>
          <Link to={this.props.navProps.next} onClick={this.props.onChange}>
            {i + 1}
          </Link>
        </li>
      );
    }

    return (
      <div className="test-card question">
        <div className="counter question-counter">
          <span className="counter__number">{this.props.index + 1}</span>
          <span className="counter__static"> of 8</span>
        </div>
        <h3 className="question__decoration _stroke-text bkg-title">
          question
        </h3>
        <h2 className="question__title lead-title">
          {this.props.question.title}
        </h2>
        <div className="question__btns nav-btns">
          <Link
            to={this.props.navProps.prev}
            className={`question__btn link _prev ${this.props.navProps.prevClass}`}
          >
            <Arrow />
            prev
          </Link>
          <Link
            to={this.props.navProps.next}
            className={`question__btn link _next ${this.props.navProps.nextClass}`}
          >
            next <Arrow />
          </Link>

          <a
            href="/results"
            className={`question__btn link _next ${this.props.navProps.resultClass}`}
          >
            results
            <Arrow />
          </a>
        </div>
        <ul className="question-grade grade">{grades.map(grade => grade)}</ul>
        <div className="grade__note _low">{this.props.question.range[0]}</div>
        <div className="grade__note _high">{this.props.question.range[1]}</div>
      </div>
    );
  }
}

export default Question;
