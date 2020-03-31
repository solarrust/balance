import React, { Component } from "react";
import data from "../../data.json";
import RowView from "./RowView";
import ColView from "./ColView";
import html2canvas from "html2canvas";
import ShareBtns from "./ShareBtns";

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

  sharePicGeneration = () => {
    html2canvas(document.querySelector(".results-wrapper._row")).then(function(
      canvas
    ) {
      document.body.appendChild(canvas);
    });

    let canvas = document.getElementsByTagName("canvas");
    // let resultImg = canvas.toDataURL();
    console.log(canvas);

    // console.log(resultImg);
    // let aLink = document.createElement("a");
    // let evt = document.createEvent("HTMLEvents");
    // evt.initEvent("click");
    // aLink.download = "image.png";
    // aLink.href = resultImg;
    // aLink.dispatchEvent(evt);
    // return resultImg;
  };

  //TODO: добавить кнопки шеринга
  //TODO: вызывать скриншот по клику на кнопку шеринга
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
          <ShareBtns onClick={this.sharePicGeneration} />

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
              resultPic={this.sharePicGeneration}
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
