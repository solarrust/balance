import React, { Component } from "react";
import { TweenMax } from "gsap";
import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question";
import data from "../../data";
import Menu from "../Main/Menu";
import QuestionPreloader from "./QuestionPreloader";

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
    this.bkgParallax = this.props.bkgParallax;
    this.linkParallax = this.props.linkParallax;
  }

  componentDidMount() {
    this.grades = sessionStorage.getItem("grades")
      ? sessionStorage.getItem("grades").split("/")
      : [];

    document.addEventListener("click", () => {
      sessionStorage.setItem("grades", this.grades.join("/"));
    });

    this.bkgParallax();
  }

  componentWillUnmount() {
    sessionStorage.setItem("grades", this.grades.join("/"));
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

    TweenMax.fromTo(
      preloaderImg,
      1,
      { rotate: "90deg" },
      { rotate: 0, ease: ease }
    );
    TweenMax.to(preloaderText, 0.3, { opacity: 1, delay: 1, ease: ease });
    TweenMax.fromTo(
      logoText,
      0.5,
      { rotate: "180deg" },
      { rotate: 0, delay: 1, ease: ease }
    );
    // TweenMax.fromTo(
    //   leftText,
    //   0.3,
    //   { opacity: 0, x: -10 },
    //   { opacity: 1, x: 0, delay: 2 }
    // );
    TweenMax.fromTo(
      rightText,
      0.3,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, delay: 1.5, ease: ease }
    );
    TweenMax.to(preloader, 0.5, {
      opacity: 0,
      zIndex: -100,
      delay: 3,
      ease: ease
    });
    // TweenMax.to(preloader, 0.5, { opacity: 0, zIndex: -1, delay: 5 });
    // TweenMax.to(preloader, 0.5, {
    //   scale: 1,
    //   opacity: 0,
    //   zIndex: -1,
    //   delay: 5
    // });
  };

  gradeShower = index => {
    if (this.grades[index] && this.grades[index] !== ",") {
      return this.grades[index];
    }
  };

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
                      next: false,
                      nextClass: "_hidden",
                      prev: false,
                      prevClass: "_hidden",
                      result: false,
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

                    return (
                      <Route
                        key={question.link}
                        path={`/${question.link}`}
                        render={() => (
                          <>
                            <QuestionPreloader
                              gradient={question.bkg}
                              image={question.preloaderImg}
                              sphere={question.sphere}
                              index={idx}
                            />

                            <div className="page questions">
                              {/*<div*/}
                              {/*  className={"questions__bkg"}*/}
                              {/*  style={{*/}
                              {/*    background: `linear-gradient(${this.state.angle}deg, ${question.bkg})`*/}
                              {/*  }}*/}
                              {/*/>*/}
                              <Question
                                index={idx}
                                question={question}
                                onChange={this.handleChange}
                                onQuestionChange={this.questionChanged}
                                navProps={navPropsObj}
                                grades={this.grades}
                                animation={this.animation}
                                strokeAnimation={this.strokeAnimation}
                                linkParallax={this.linkParallax}
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
