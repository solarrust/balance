import React from "react";
import { Route, Switch } from "react-router-dom";
import { TweenMax } from "gsap";
import "./App.sass";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import TestPage from "./components/Test/TestPage";
import Header from "./components/Header/Header";
import Questions from "./components/Questions/Questions";
import Result from "./components/Result/Result";

let customCursor;

class App extends React.Component {
  componentDidMount() {
    customCursor = document.querySelector(".cursor");

    this.cursorMoverHandler();
    this.textAutoShowing();
  }

  cursorMoverHandler = () => {
    document.addEventListener("mousemove", e => {
      let cursorCoords = customCursor.getBoundingClientRect();
      TweenMax.fromTo(
        customCursor,
        0.05,
        {},
        {
          top: `${e.pageY - cursorCoords.width / 2}px`,
          left: `${e.pageX - cursorCoords.width / 2}px`
        }
      );
    });

    this.cursorHoverHandler();
  };

  cursorHoverHandler = () => {
    let links = document.querySelectorAll("a");
    links.forEach(el => {
      el.addEventListener("mouseout", () => {
        customCursor.classList.remove("_medium");
        // TweenMax.fromTo(
        //   customCursor,
        //   0.2,
        //   { width: "55px", height: "55px" },
        //   { width: "42px", height: "42px" }
        // );
      });
      el.addEventListener("mouseover", () => {
        customCursor.classList.add("_medium");
        // TweenMax.fromTo(
        //   customCursor,
        //   0.2,
        //   { width: "42px", height: "42px" },
        //   { width: "55px", height: "55px" }
        // );
      });
    });
  };

  textAutoShowing = function() {
    let autoShowingText = document.querySelector("[data-auto-show-title]");

    if (autoShowingText) {
      let delay = 0;

      if (autoShowingText.getAttribute("data-auto-show-title") !== true) {
        delay = autoShowingText.getAttribute("data-auto-show-title") * 1000;
      }

      console.log(typeof delay);

      autoShowingText.innerHTML = autoShowingText.innerHTML.replace(
        /(?![^<]*>)[^<]/g,
        c => `<span>${c}</span>`
      );

      setTimeout(() => {
        Array.from(autoShowingText.children).forEach((ch, i) => {
          TweenMax.fromTo(
            ch,
            0.25,
            {
              opacity: 0,
              y: 25
            },
            { opacity: 1, y: 0, delay: i * 0.05 }
          );
        });
      }, delay);
    }
  };

  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route
            path="/"
            exact
            component={() => <Main animation={this.textAutoShowing} />}
          />
          <Route
            path="/about"
            exact
            component={() => <About animation={this.textAutoShowing} />}
          />
          <Route
            path="/test"
            exact
            component={() => <TestPage animation={this.textAutoShowing} />}
          />
          <Route
            path="/questions"
            exact
            component={() => <Questions animation={this.textAutoShowing} />}
          />
          <Route
            path="/results"
            exact
            component={() => <Result animation={this.textAutoShowing} />}
          />
        </Switch>

        <div className="cursor" />
      </>
    );
  }
}

export default App;
