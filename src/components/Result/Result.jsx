import React, { Component } from "react";
import data from "../../data.json";
import RowView from "./RowView";
import ColView from "./ColView";
import { NavLink } from "react-router-dom";
import Menu from "../Main/Menu";

const { questions } = data;

// TODO: заглушка для страницы результатов, когда тест не пройден
// TODO: заменить иконку на кнопке вида "в столбик" на правильную

class Result extends Component {
  constructor(props) {
    super(props);
    this.grades = localStorage.getItem("grades").split("/");
    this.state = {
      view: "col-view"
    };
    this.resultCircles = [];
  }

  componentDidMount() {
    this.grades = localStorage.getItem("grades").split("/");
    this.viewSwitchHandler();
    this.resultCircles = Array.from(
      document.querySelectorAll(".results-wrapper > div")
    );
  }

  viewSwitchHandler = () => {
    this.setState({
      view: this.state.view === "row-view" ? "col-view" : "row-view"
    });

    document.getElementById(this.state.view).checked = true;
  };

  changeActiveHandler(e) {
    document.querySelectorAll("[data-test-menu-link]").forEach(el => {
      el.classList.remove("_active");
    });
    e.target.classList.add("_active");
  }

  render() {
    return (
      <div className="main results page">
        <div className="view-icons">
          <span className="view-icons__text">view:</span>
          <input
            className="view-icon _row"
            type={"radio"}
            name={"view"}
            id={"row-view"}
            onClick={this.viewSwitchHandler}
          />
          <label htmlFor={"row-view"} className="view-icon__label">
            row view
          </label>
          <input
            className="view-icon _col"
            type={"radio"}
            name={"view"}
            id={"col-view"}
            onClick={this.viewSwitchHandler}
          />
          <label htmlFor={"col-view"} className="view-icon__label">
            column view
          </label>
        </div>
        {this.state.view === "row-view" ? (
          <>
            <ColView
              items={questions}
              grades={this.grades}
              circles={this.resultCircles}
            />
            <Menu className="main-menu questions-menu text-menu">
              {questions.map((question, i) => (
                <li
                  className="main-menu__link text test-menu__item"
                  key={i}
                  data-test-menu-link={i}
                  onClick={this.changeActiveHandler}
                >
                  {question.sphere}
                  <span
                    className={"test-menu__circle"}
                    style={{
                      background: `linear-gradient(${question.bkg})`
                    }}
                  ></span>
                </li>
              ))}
            </Menu>
          </>
        ) : (
          <RowView
            items={questions}
            grades={this.grades}
            circles={this.resultCircles}
          />
        )}
      </div>
    );
  }
}
export default Result;
