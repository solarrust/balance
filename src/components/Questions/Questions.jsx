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
let bkgArray = [
  "179.58deg, #E5D7C9 0.42%, #71A7B7 99.12%",
  "180deg, #A8ACB8 0%, rgba(168, 172, 184, 0) 100%",
  "0.02deg, #87B1CC 3.52%, #C3C9DD 99.99%",
  "179.58deg, #649677 0.42%, #D1C1B0 99.12%",
  "180deg, #D0C06B 0%, #DCAD9F 100%",
  "180deg, #768CC4 0%, #CDBAB9 100%",
  "0deg, #A5CFDB 0%, #ACB6C5 100%",
  "180deg, #B7635B 0%, #C4A693 100%"
];
let index;

// TODO: Прикрутить реакцию менюшки на переключение
// TODO: Запоминать выбраную оценку
// TODO: Выводить выбраную оценку рядом с меню
// TODO: Показывать кнопки "вперёд" / "назад"

class Questions extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      questions: new Array(questions.length),
      bkg: bkgArray[index],
      active: 0
    };
  }

  componentDidMount() {
    testMenuItems = document.querySelectorAll("[data-test-menu-link]");
    this.activeLink(testMenuItems[this.state.active]);
    this.bkgChanger();
  }

  bkgChanger() {
    this.setState({ bkg: bkgArray[this.state.active] });
  }

  handleClick(e) {
    testMenuItems.forEach(el => el.classList.remove("_active"));
    e.target.parentNode.classList.add(activeClass);
    this.setState({
      active: e.currentTarget.parentNode.getAttribute("data-test-menu-link")
    });
    this.bkgChanger();
  }

  activeLink(el) {
    el.classList.add(activeClass);
  }

  questionChanged(num) {
    this.setState({ active: num });
  }

  render() {
    let pageBkg = {
      backgroundImage: `linear-gradient(${this.state.bkg})`
    };
    console.log("--> active" + " " + this.state.active);

    return (
      <HashRouter>
        <div className="page questions" style={pageBkg}>
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
                            <Question
                              onQuestionChange={this.questionChanged}
                              index={index}
                              question={question}
                            />
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
          <Menu className="main-menu questions-menu">
            {questions.map((question, index) => (
              <li
                className="main-menu__link text"
                key={index}
                data-test-menu-link={index}
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
