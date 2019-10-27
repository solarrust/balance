import React, { Component } from "react";
import {
  HashRouter,
  Link,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question";
import data from "../../data";
import Menu from "../Main/Menu";
const questions = data.questions;
let activeClass = "_active";
let testMenuItems;

// TODO: Закончить вёрстку
// TODO: Прикрутить реакцию менюшки на переключение
// TODO: Менять фон при переключении вопроса
// TODO: Запоминать выбраную оценку
// TODO: Выводить выбраную оценку рядом с меню
// TODO: Показывать кнопки "вперёд" / "назад"

class Questions extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      questions: new Array(questions.length)
    };
  }

  componentDidMount() {
    testMenuItems = document.querySelectorAll("[data-test-menu-link]");
    // this.activeLink(testMenuItems[0]);
  }

  handleClick(e) {
    testMenuItems.forEach(el => el.classList.remove("_active"));
    e.target.parentNode.classList.add(activeClass);
  }

  activeLink(el) {
    el.classList.add(activeClass);
  }

  render() {
    return (
      <HashRouter>
        <div className="page test">
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  classNames="fade"
                  timeout={600}
                >
                  <Switch location={location}>
                    {questions.map((question, index) => {
                      return (
                        <Route
                          key={question.link}
                          path={`/${question.link}`}
                          render={() => (
                            <Question index={index} question={question} />
                          )}
                        />
                      );
                    })}
                    <Redirect from="/" to={questions[0].link} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Menu className="main-menu">
            {questions.map((question, index) => (
              <li
                className="main-menu__link text"
                key={index}
                data-test-menu-link
              >
                <NavLink
                  onClick={e => this.handleClick(e)}
                  className="main-menu__link-item"
                  to={question.link}
                >
                  {question.sphere}
                </NavLink>
              </li>
            ))}
          </Menu>
        </div>
      </HashRouter>
    );
  }
}

export default Questions;
