import React, { Component } from "react";
import data from "../../data.json";
import RowView from "./RowView";
import ColView from "./ColView";
import { Link, NavLink } from "react-router-dom";
import Menu from "../Main/Menu";
import Arrow from "../SVG/Arrow";

const { questions } = data;

// TODO: заглушка для страницы результатов, когда тест не пройден

class Result extends Component {
  constructor(props) {
    super(props);
    this.grades = [];
    this.state = {
      view: "row-view"
    };
    this.resultCircles = [];
  }

  componentDidMount() {
    console.log(sessionStorage.getItem("grades").length);
    this.grades =
      sessionStorage.getItem("grades").length > 0
        ? sessionStorage.getItem("grades").split("/")
        : [];
    if (this.grades.length > 0) {
      this.viewSwitchHandler();
      this.resultCircles = Array.from(
        document.querySelectorAll(".results-wrapper > div")
      );
    }
  }

  viewSwitchHandler = () => {
    this.setState({
      view: this.state.view === "row-view" ? "col-view" : "row-view"
    });

    if (document.getElementById(this.state.view)) {
      document.getElementById(this.state.view).checked = true;
    }
  };

  render() {
    console.log(this.grades.length);
    if (this.grades.length > 0) {
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
    } else {
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
          <h2>No test</h2>
        </div>
      );
    }
  }
}
export default Result;
