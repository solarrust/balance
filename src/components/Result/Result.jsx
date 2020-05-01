import React, { Component } from "react";
import data from "../../data.json";
import RowView from "./RowView";
import ColView from "./ColView";
import html2canvas from "html2canvas";
import ShareBtns from "./ShareBtns";
import UploadClient from "@uploadcare/upload-client";

const client = new UploadClient({ publicKey: "83c160907f01bd6a3574" });
const { questions } = data;

class Result extends Component {
  constructor(props) {
    super(props);
    this.grades = [];
    this.state = {
      view: "row-view",
      shareImgReady: false
    };
    this.resultCircles = [];
  }

  componentDidMount() {
    setTimeout(this.sharePicGeneration, 1500);

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

  sharePicGeneration = (data, options) => {
    let canvas;
    html2canvas(document.querySelector("#root"), {
      backgroundColor: "#e1dcdb",
      ignoreElements: function(el) {
        return (
          el.classList.contains("view-icons") ||
          el.classList.contains("share-btns") ||
          el.classList.contains("link") ||
          el.classList.contains("cursor")
        );
      }
    })
      .then(function(canvas) {
        document.body.appendChild(canvas);
      })
      .then(function() {
        canvas = document.querySelector("canvas");
        canvas.toBlob(function(blob) {
          shareImgURLExtractor(blob);
        });
      });

    function shareBtnsContentGenerator(UUID) {
      let btns = Array.from(
        document.querySelectorAll(".react-sharing-button__link")
      );

      btns.forEach(btn => {
        let href = btn.getAttribute("href");
        btn.setAttribute("href", `${href}/${UUID}`);
      });
    }

    function shareImgURLExtractor(URL) {
      client
        .uploadFile(URL, options)
        .then(file => shareBtnsContentGenerator(file.uuid));
    }
  };

  render() {
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
          <ShareBtns />

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
