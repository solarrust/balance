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
      view: "row-view",
      shareImgReady: false
    };
    this.resultCircles = [];
  }

  componentDidMount() {
    this.blobPolyfill();
    setTimeout(this.sharePicGeneration, 500);

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

  blobPolyfill() {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
        value: function(callback, type, quality) {
          var canvas = this;
          setTimeout(function() {
            var binStr = atob(canvas.toDataURL(type, quality).split(",")[1]),
              len = binStr.length,
              arr = new Uint8Array(len);

            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], { type: type || "image/png" }));
          });
        }
      });
    }
  }

  shareBtnsContentGenerator() {
    if (this.state.shareImgReady) {
      let img = document.querySelector("img.result-img");
      let shareBtns = document.querySelectorAll("a.react-sharing-button__link");
      // shareBtns.forEach(btn => {
      //   btn.url = img.src;
      // });
    }
  }

  sharePicGeneration = () => {
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
          let newImg = document.createElement("img"),
            url = URL.createObjectURL(blob);

          newImg.classList.add("result-img");

          newImg.onload = function() {
            URL.revokeObjectURL(url);
          };

          let reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onload = function() {
            newImg.src = reader.result;
            shareImgURLExtractor(reader.result);
          };
        });
      });

    function shareImgURLExtractor(URL) {
      let metaOG = document.createElement("meta");
      metaOG.setAttribute("property", "og:image");
      metaOG.content = URL;

      document.head.appendChild(metaOG);
    }
  };

  //TODO: добавить кнопки шеринга
  //TODO: вызывать скриншот по клику на кнопку шеринга
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
