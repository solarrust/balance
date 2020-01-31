import React, { Component } from "react";
import {
  HashRouter,
  Link,
  NavLink,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question";
import data from "../../data";
import Menu from "../Main/Menu";
import Arrow from "../SVG/Arrow";

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
    this.grades = localStorage.getItem("grades")
      ? localStorage.getItem("grades").split("/")
      : new Array(questions.length);

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("grades", this.grades.join("/"));
    });
  }

  componentWillUnmount() {
    console.log(this.grades);
    localStorage.setItem("grades", this.grades.join("/"));
  }

  handleChange = e => {
    document
      .querySelectorAll(".grade__item")
      .forEach(el => el.classList.remove("_choice"));
    e.target.classList.add("_choice");
    this.grades[this.state.active] = e.target.innerHTML;

    console.log(this.state.active);
    console.log(this.grades);
  };

  questionChanged = num => {
    this.setState({ active: num });
  };

  gradeShower = index => {
    if (this.grades[index] && this.grades[index] !== ",") {
      return this.grades[index];
    }
  };

  btnShower = index => {
    if (index === 0) {
      return (
        <>
          <Link
            to={questions[index + 1].link}
            className="question__btn link _next"
          >
            next <Arrow />
          </Link>
        </>
      );
    } else if (index === questions.length - 1) {
      return (
        <>
          <Link
            to={questions[index - 1].link}
            className="question__btn link _prev"
          >
            <Arrow />
            prev
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            to={questions[index - 1].link}
            className="question__btn link _prev"
          >
            <Arrow />
            prev
          </Link>
          <Link
            to={questions[index + 1].link}
            className="question__btn link _next"
          >
            next <Arrow />
          </Link>
        </>
      );
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
                              btnShower={this.btnShower}
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
