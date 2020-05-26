import React, { Component } from "react";
import gsap from "gsap";
import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question";
import data from "../../data";
import Menu from "../Main/Menu";
import QuestionPreloader from "./QuestionPreloader";
let Granim = require("granim");

// TODO: отключить меню навигации перед выкатом на бой
// TODO: при выборе оценки на последнем вопросе перекидывать на страницу результатов

const questions = data.questions;

class Questions extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.grades = [];
    this.state = {
      active: 0,
      angle: 180
    };
    this.animation = this.props.animation;
    this.strokeAnimation = this.props.strokeAnimation;
    this.linkParallax = this.props.linkParallax;
  }

  componentDidMount() {
    this.grades = sessionStorage.getItem("grades")
      ? sessionStorage.getItem("grades").split("/")
      : [];

    document.addEventListener("click", () => {
      sessionStorage.setItem("grades", this.grades.join("/"));
    });

    this.props.hoverLinks();
    this.props.defaultCursor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.hoverLinks();
    this.props.defaultCursor();
  }

  componentWillUnmount() {
    sessionStorage.setItem("grades", this.grades.join("/"));
    this.props.defaultCursor();
  }

  handleChange = e => {
    this.grades[this.state.active] = e.target.innerHTML;
    document
      .querySelectorAll(".grade__item")
      .forEach(el => el.classList.remove("_choice"));
    e.target.parentNode.classList.add("_choice");
    this.forceUpdate();
  };

  questionChanged = num => {
    this.setState({ active: num });
    let preloader = document.querySelector(".preloader");
    let preloaderImg = document.querySelector(".preloader__img");
    let preloaderText = document.querySelector(".preloader__content");
    let logoText = document.querySelector(".preloader__text._center");
    let rightText = document.querySelector(".preloader__text._right");
    let ease = "circ.out";

    let tl = gsap.timeline();

    preloaderImg.onload = () => {
      tl.to(preloaderImg, 0.3, { opacity: 1, delay: 0.2 })
        .fromTo(
          preloaderImg,
          1.5,
          { rotation: 90 },
          { rotation: 0, ease: ease }
        )
        .to(preloaderText, 0.3, { opacity: 1, ease: ease })
        .fromTo(logoText, 0.5, { rotation: 180 }, { rotation: 0, ease: ease })
        .fromTo(
          rightText,
          0.3,
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, ease: ease }
        )
        .to(preloader, 0.5, {
          opacity: 0,
          zIndex: -100,
          ease: ease
        });
    };
  };

  gradeShower = index => {
    if (this.grades[index] && this.grades[index] !== ",") {
      return this.grades[index];
    }
  };

  gradientCanvas(gradient, prelGradient) {
    const reg = /(?:#)[0-9a-f]{8}|(?:#)[0-9a-f]{6}|(?:#)[0-9a-f]{4}|(?:#)[0-9a-f]{3}/gi;
    const colorsArr = gradient.match(reg);
    const colorsArrReversed = colorsArr.slice();
    colorsArrReversed.reverse();

    let canvasEls = Array.from(document.querySelectorAll("[data-gradient]"));

    let gradientColors = [colorsArrReversed, colorsArr];

    canvasEls.forEach(cEl => {
      if (cEl.getAttribute("data-gradient") === "preloader") {
        let prevGrad = prelGradient.match(reg);
        let bigGradArr = gradientColors.slice();
        bigGradArr.unshift(prevGrad);
        var granimInstance = new Granim({
          element: cEl,
          direction: "top-bottom",
          stateTransitionSpeed: 500,
          states: {
            "default-state": {
              gradients: bigGradArr,
              loop: false,
              transitionSpeed: 1000
            }
          }
        });
      } else {
        var granimInstance = new Granim({
          element: cEl,
          direction: "top-bottom",
          isPausedWhenNotInView: true,
          states: {
            "default-state": {
              gradients: gradientColors,
              transitionSpeed: 2500
            }
          }
        });
      }
    });
  }

  render() {
    return (
      <HashRouter>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={600}
              >
                <Switch location={location}>
                  {questions.map((question, idx) => {
                    let navPropsObj = {
                      next: "#",
                      nextClass: "_hidden",
                      prev: "#",
                      prevClass: "_hidden",
                      result: "#",
                      resultClass: "_hidden"
                    };

                    if (idx === 0) {
                      navPropsObj.next = `${questions[idx + 1].link}`;
                      if (this.grades[idx] && this.grades[idx] !== 0) {
                        navPropsObj.nextClass = "_visible";
                      }
                    } else if (idx === questions.length - 1) {
                      navPropsObj.prev = `${questions[idx - 1].link}`;
                      navPropsObj.prevClass = "_visible";
                      if (this.grades.length === 8) {
                        navPropsObj.resultClass = "_visible";
                      }
                    } else {
                      navPropsObj.next = `${questions[idx + 1].link}`;

                      navPropsObj.prev = `${questions[idx - 1].link}`;
                      navPropsObj.prevClass = "_visible";
                      if (this.grades[idx] && this.grades[idx] !== 0) {
                        navPropsObj.nextClass = "_visible";
                      }
                    }

                    let prevGradient;

                    if (idx === 0) {
                      prevGradient = "#71A7B7 0, #cedbe4 100%";
                    } else {
                      prevGradient = questions[idx - 1].bkg;
                    }

                    return (
                      <Route
                        key={question.link}
                        path={`/${question.link}`}
                        render={() => (
                          <>
                            <QuestionPreloader
                              gradient={question.bkg}
                              prevGradient={prevGradient}
                              image={question.preloaderImg}
                              sphere={question.sphere}
                              index={idx}
                              gradientAnimation={this.gradientCanvas}
                            />

                            <div className="page questions">
                              <Question
                                index={idx}
                                question={question}
                                onChange={this.handleChange}
                                onQuestionChange={this.questionChanged}
                                navProps={navPropsObj}
                                prevGradient={prevGradient}
                                grades={this.grades}
                                animation={this.animation}
                                strokeAnimation={this.strokeAnimation}
                                linkParallax={this.linkParallax}
                                gradientAnimation={this.gradientCanvas}
                              />
                            </div>
                          </>
                        )}
                      />
                    );
                  })}
                  <Redirect from="/*" to={questions[0].link} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
        <Menu className="main-menu questions-menu">
          {questions.map((question, i) => (
            <li
              className="main-menu__link text"
              key={i}
              data-test-menu-link={i}
            >
              <NavLink className="main-menu__link-item" to={question.link}>
                {question.sphere}
                <span className="questions-menu__grade">
                  {this.gradeShower(i)}
                </span>
              </NavLink>
            </li>
          ))}
        </Menu>
      </HashRouter>
    );
  }
}

export default Questions;
