import React, { Component } from "react";
import { Link } from "react-router-dom";
import Arrow from "../SVG/Arrow";
import { TweenMax } from "gsap";

let numbers;
let customCursor;

// TODO: добить плавное (побуквенное) изменение аутлайного текста по ховеру

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
    this.hoverHandler();
    this.props.animation();
  }

  cursorHoverHandler() {
    numbers.forEach(el => {
      el.addEventListener("mouseout", () => {
        customCursor.classList.remove("_big");

        TweenMax.to(el, 0.1, { x: 0, y: 0 });
      });
      el.addEventListener("mouseover", () => {
        customCursor.classList.add("_big");
      });
    });
  }

  hoverHandler = () => {
    let links = Array.from(document.querySelectorAll("[data-trigger-link]"));

    let text = this.strokeCopying();

    links.forEach(link => {
      link.onmouseenter = () => {
        text.classList.add("_triggered");
      };

      link.onmouseleave = () => {
        text.classList.remove("_triggered");
      };
    });
  };

  strokeCopying = () => {
    let text = document.querySelector("[data-triggered-text]");

    if (text) {
      let textClasses = text.classList;

      let copyText = document.createElement("h3");
      copyText.classList = textClasses;
      copyText.classList.add("_copy");
      copyText.setAttribute("aria-hidden", "true");
      copyText.innerHTML = text.innerHTML;
      text.after(copyText);
    }

    return text;
  };

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
        <li key={i} className={classList} data-trigger-link>
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
        <h3
          className="question__decoration _stroke-text bkg-title"
          data-triggered-text
        >
          question
        </h3>
        <h2
          className="question__title lead-title"
          data-auto-show-title={"3"}
          dangerouslySetInnerHTML={{ __html: this.props.question.title }}
        />
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
