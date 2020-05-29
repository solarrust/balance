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
      view: "row-view"
    };
    this.resultCircles = [];
  }

  componentDidMount() {
    if (!sessionStorage.getItem("grades")) {
      window.location.href = "/";
    } else {
      if (sessionStorage.getItem("grades").length > 0) {
        this.grades = sessionStorage.getItem("grades").split("/");
      } else {
        this.grades = [];
      }
    }

    if (this.grades.length > 0) {
      this.viewSwitchHandler();
      this.resultCircles = Array.from(
        document.querySelectorAll(".results-wrapper > div")
      );
    }

    setTimeout(this.sharePicGeneration, 2000);
    this.props.hoverLinks();
    this.props.defaultCursor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.hoverLinks();
    this.props.defaultCursor();
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
          if (process.env.NODE_ENV === "production") {
            shareImgURLExtractor(blob);
          }
        });
      });

    function shareBtnsContentGenerator(UUID) {
      let btns = Array.from(
        document.querySelectorAll(".react-sharing-button__link")
      );
      let btnsContainer = document.querySelector(".share-btns");

      btns.forEach(btn => {
        let href = btn.getAttribute("href");
        btn.setAttribute("href", `${href}/${UUID}`);
      });

      if (!btnsContainer.classList.contains("_ready")) {
        btnsContainer.classList.add("_ready");
      }
    }
    function shareImgURLExtractor(URL) {
      // TODO: Раскомментировать перед заливкой!
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
            <label
              htmlFor={"row-view"}
              className="view-icon__label"
              data-hover-trigger
            >
              row view
            </label>
            <input
              className="view-icon _col"
              type={"radio"}
              name={"view"}
              id={"col-view"}
              onClick={this.viewSwitchHandler}
            />
            <label
              htmlFor={"col-view"}
              className="view-icon__label"
              data-hover-trigger
            >
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
            <label
              htmlFor={"row-view"}
              className="view-icon__label"
              data-hover-trigger
            >
              row view
            </label>
            <input
              className="view-icon _col"
              type={"radio"}
              name={"view"}
              id={"col-view"}
              onClick={this.viewSwitchHandler}
            />
            <label
              htmlFor={"col-view"}
              className="view-icon__label"
              data-hover-trigger
            >
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
