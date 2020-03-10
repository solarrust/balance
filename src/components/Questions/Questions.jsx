import React, { Component } from "react";
import { Power0, Power4, Power2, TweenMax } from "gsap";
import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question";
import data from "../../data";
import Menu from "../Main/Menu";

const questions = data.questions;

class Questions extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.grades = [];
    this.state = {
      active: 0
    };
  }

  componentDidMount() {
    this.grades = sessionStorage.getItem("grades")
      ? sessionStorage.getItem("grades").split("/")
      : [];

    document.addEventListener("click", () => {
      sessionStorage.setItem("grades", this.grades.join("/"));
    });
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
    let ease = "circ.out";

    console.log(preloaderImg);
    TweenMax.fromTo(
      preloaderImg,
      1.5,
      { scale: 2.5 },
      { scale: 1, ease: ease }
    );
    TweenMax.to(preloaderText, 0.3, { opacity: 1, delay: 1.5, ease: ease });
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
                  {questions.map((question, i) => {
                    let navPropsObj = {
                      next: false,
                      nextClass: "_hidden",
                      prev: false,
                      prevClass: "_hidden",
                      result: false,
                      resultClass: "_hidden"
                    };

                    if (i === 0) {
                      navPropsObj.next = `${questions[i + 1].link}`;
                      if (this.grades[i] && this.grades[i] !== 0) {
                        navPropsObj.nextClass = "_visible";
                      }
                    } else if (i === questions.length - 1) {
                      navPropsObj.prev = `${questions[i - 1].link}`;
                      navPropsObj.prevClass = "_visible";
                      if (this.grades.length === 8) {
                        navPropsObj.resultClass = "_visible";
                      }
                    } else {
                      navPropsObj.next = `${questions[i + 1].link}`;

                      navPropsObj.prev = `${questions[i - 1].link}`;
                      navPropsObj.prevClass = "_visible";
                      if (this.grades[i] && this.grades[i] !== 0) {
                        navPropsObj.nextClass = "_visible";
                      }
                    }

                    return (
                      <Route
                        key={question.link}
                        path={`/${question.link}`}
                        render={() => (
                          <>
                            <div
                              className={`preloader test-card__preloader question__preloader _${i}`}
                              style={{
                                background: `linear-gradient(${question.bkg})`
                              }}
                            >
                              <div className="preloader__img" />
                              <div className="preloader__content">
                                <span className="preloader__text _left">
                                  balance
                                </span>
                                <div className="preloader__logo inner-logo">
                                  <div className="inner-logo__circle _half" />
                                  <div className="inner-logo__circle _full">
                                    <span className="preloader__text _center">
                                      your
                                    </span>
                                  </div>
                                </div>
                                <span className="preloader__text _right">
                                  {question.sphere}
                                </span>
                              </div>
                            </div>

                            <div
                              className="page questions"
                              style={{
                                background: `linear-gradient(${question.bkg})`
                              }}
                            >
                              <Question
                                index={i}
                                question={question}
                                onChange={this.handleChange}
                                onQuestionChange={this.questionChanged}
                                navProps={navPropsObj}
                                grades={this.grades}
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
