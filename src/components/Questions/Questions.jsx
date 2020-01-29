import React, { Component } from "react";
import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question";
import data from "../../data";
import Menu from "../Main/Menu";

const questions = data.questions;

// TODO: Убрать мигание при смене вопроса
// TODO: Выводить выбраную оценку рядом с меню
// TODO: Показывать кнопки "вперёд" / "назад"

class Questions extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.grades = new Array(questions.length);
    this.state = {
      active: 0
    };
  }

  componentDidMount() {}

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
              </NavLink>
            </li>
          ))}
        </Menu>
      </HashRouter>
    );
  }
}

export default Questions;
