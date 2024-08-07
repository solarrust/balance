import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";
import Arrow from "../SVG/Arrow";

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
    this.props.animation();
    this.props.strokeAnimation();
    this.props.linkParallax();
    this.props.gradientAnimation(
      this.props.question.bkg,
      this.props.prevGradient
    );

    this.cursorHoverHandler();
    this.props.defaultCursor();
    this.props.scrollToTop();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.defaultCursor();
  }

  componentWillUnmount() {
    this.props.defaultCursor();
  }

  cursorHoverHandler() {
    numbers.forEach(number => {
      number.addEventListener("mouseout", () => {
        customCursor.classList.remove("_big");

        TweenMax.to(number, 0.1, { x: 0, y: 0 });
      });
      number.addEventListener("mouseover", () => {
        customCursor.classList.add("_big");
      });
    });
  }

  render() {
    const { index, question, navProps, grades, onChange } = this.props;
    const gradesNodes = [];
    for (let i = 0; i < 10; i++) {
      let classList = "grade__item";
      const choiceClass = "_choice";
      if (grades[index] && grades[index] !== "" && grades[index] - 1 === i) {
        classList += ` ${choiceClass}`;
      }

      if (index === grades.length - 1) {
        gradesNodes.push(
          <li key={i} className={classList} data-parallax-link-scene>
            <Link to={navProps.next} data-parallax-link data-depth="2">
              {i + 1}
            </Link>
          </li>
        );
      } else {
        gradesNodes.push(
          <li key={i} className={classList} data-parallax-link-scene>
            <Link
              to={navProps.next}
              onClick={onChange}
              data-parallax-link
              data-depth="2"
            >
              {i + 1}
            </Link>
          </li>
        );
      }
    }

    return (
      <>
        <canvas className="questions__bkg" data-gradient />

        <div className="test-card question">
          <div className="counter question-counter">
            <span className="counter__number">{index + 1}</span>
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
            data-auto-show-title="3"
            data-splitting=""
            dangerouslySetInnerHTML={{ __html: question.title }}
          />
          <div className="question__btns nav-btns">
            <Link
              to={navProps.prev}
              className={`question__btn link _prev ${navProps.prevClass}`}
              data-hover-trigger
            >
              <Arrow />
              prev
            </Link>
            <Link
              to={navProps.next}
              className={`question__btn link _next ${navProps.nextClass}`}
              data-hover-trigger
            >
              next <Arrow />
            </Link>

            <a
              href="/results"
              className={`question__btn link _next ${navProps.resultClass}`}
              data-hover-trigger
            >
              results
              <Arrow />
            </a>
          </div>
          <ul className="question-grade grade" data-trigger-link>
            {gradesNodes.map(gradeNode => gradeNode)}
          </ul>
          <div className="grade__note _low">{question.range[0]}</div>
          <div className="grade__note _high">{question.range[1]}</div>
        </div>
      </>
    );
  }
}

export default Question;
