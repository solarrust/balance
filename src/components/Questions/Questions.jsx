import React, { Component } from "react";
import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question";
import data from "../../data";
import Menu from "../Main/Menu";

const questions = data.questions;

// TODO: Убрать мигание при смене вопроса
// TODO: Для цифр оценки в меню сделать эффект вырезанного в круге текста
// TODO: Подкрутить анимацию оценок в нижней шкале

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
    document
      .querySelectorAll(".grade__item")
      .forEach(el => el.classList.remove("_choice"));
    e.target.classList.add("_choice");
    this.grades[this.state.active] = e.target.innerHTML;
    this.forceUpdate();
  };

  questionChanged = num => {
    this.setState({ active: num });
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
                      if (this.grades[i] && this.grades[i] !== 0) {
                        navPropsObj.next = `${questions[i + 1].link}`;
                        navPropsObj.nextClass = "_visible";
                      }
                    } else if (i === questions.length - 1) {
                      navPropsObj.prev = `${questions[i - 1].link}`;
                      navPropsObj.prevClass = "_visible";
                      if (this.grades.length === 8) {
                        navPropsObj.resultClass = "_visible";
                      }
                    } else {
                      navPropsObj.prev = `${questions[i - 1].link}`;
                      navPropsObj.prevClass = "_visible";
                      if (this.grades[i] && this.grades[i] !== 0) {
                        navPropsObj.next = `${questions[i + 1].link}`;
                        navPropsObj.nextClass = "_visible";
                      }
                    }

                    return (
                      <Route
                        key={question.link}
                        path={`/${question.link}`}
                        render={() => (
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
                            />
                          </div>
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
