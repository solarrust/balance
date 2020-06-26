import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { TweenMax } from "gsap";
import "./App.sass";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import TestPage from "./components/Test/TestPage";
import Header from "./components/Header/Header";
import Questions from "./components/Questions/Questions";
import Result from "./components/Result/Result";
import Parallax from "parallax-js";
import Splitting from "splitting";

let customCursor;
const cursorActiveClass = "_medium";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    customCursor = document.querySelector(".cursor");

    this.textAutoShowing();
    this.heightCalc(window.innerHeight);
    window.addEventListener("resize", () => {
      this.heightCalc(window.innerHeight);
    });
  }

  cursorDefault() {
    if (customCursor) {
      customCursor.classList.remove(cursorActiveClass);
      if (customCursor.classList.contains("_big")) {
        customCursor.classList.remove("_big");
      }
    }
  }

  heightCalc(windowHeight) {
    let vh = windowHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  cursorMoveHandler() {
    document.addEventListener("mousemove", e => {
      let cursorCoords = customCursor.getBoundingClientRect();
      TweenMax.to(customCursor, 0.05, {
        top: `${e.pageY - cursorCoords.width / 2}px`,
        left: `${e.pageX - cursorCoords.width / 2}px`
      });
    });

    function cursorHoverHandler() {
      let links = Array.from(document.querySelectorAll("[data-hover-trigger]"));
      links.forEach(el => {
        el.addEventListener("mouseout", () => {
          customCursor.classList.remove(cursorActiveClass);
        });
        el.addEventListener("mouseover", () => {
          customCursor.classList.add(cursorActiveClass);
        });
      });
    }

    cursorHoverHandler();
  }

  textAutoShowing() {
    let autoShowingText = document.querySelector("[data-splitting]");

    if (autoShowingText) {
      let delay = 0;

      if (autoShowingText.getAttribute("data-auto-show-title") !== "") {
        delay = autoShowingText.getAttribute("data-auto-show-title") * 1150;
      }

      Splitting();

      setTimeout(() => {
        Array.from(autoShowingText.querySelectorAll(".char")).forEach(
          (ch, i) => {
            TweenMax.fromTo(
              ch,
              0.1,
              {
                opacity: 0,
                y: 5
              },
              { opacity: 1, y: 0, delay: i * 0.03 }
            );
          }
        );
      }, delay);
    }
  }

  strokeHoverHandler = () => {
    let links = Array.from(document.querySelectorAll("[data-trigger-link]"));

    let texts = this.strokeCopying();
    let chars = Array.from(texts.original.querySelectorAll("span"));
    let copyChars = Array.from(texts.copy.querySelectorAll("span"));
    copyChars.forEach(ch => (ch.style.opacity = "0"));

    function italicShown() {
      this.removeEventListener("mouseleave", italicHidden);
      setTimeout(() => {
        this.addEventListener("mouseleave", italicHidden);
      }, 500);

      chars.forEach((ch, i) => {
        TweenMax.to(ch, 0.2, {
          opacity: 0,
          y: -10,
          delay: 0.15 + i * 0.03
        });
      });
      copyChars.forEach((ch, i) => {
        ch.style.translateY = -10;
        TweenMax.to(ch, 0.2, {
          opacity: 1,
          y: 0,
          delay: 0.35 + i * 0.05
        });
      });
    }

    function italicHidden() {
      this.removeEventListener("mouseenter", italicShown);
      setTimeout(() => {
        this.addEventListener("mouseenter", italicShown);
      }, 500);
      chars.forEach((ch, i) => {
        ch.style.translateY = -10;

        TweenMax.to(ch, 0.2, {
          opacity: 1,
          y: 0,
          delay: 0.35 + i * 0.03
        });
      });
      copyChars.forEach((ch, i) => {
        TweenMax.to(ch, 0.2, {
          opacity: 0,
          y: -10,
          delay: 0.15 + i * 0.05
        });
      });
    }

    links.forEach(link => {
      link.addEventListener("mouseenter", italicShown);

      link.addEventListener("mouseleave", italicHidden);
    });
  };

  strokeCopying() {
    let text = document.querySelector("[data-triggered-text]");
    let copyText;

    if (text) {
      let textClasses = text.classList;

      copyText = document.createElement("h3");
      copyText.classList = textClasses;
      copyText.classList.add("_copy");
      copyText.setAttribute("aria-hidden", "true");
      copyText.innerHTML = text.innerHTML.replace(
        /(?![^<]*>)[^<]/g,
        c => `<span>${c}</span>`
      );
      text.after(copyText);

      text.innerHTML = text.innerHTML.replace(
        /(?![^<]*>)[^<]/g,
        c => `<span>${c}</span>`
      );
    }

    return { original: text, copy: copyText };
  }

  linksParallax() {
    let links = Array.from(document.querySelectorAll("[data-parallax-link]"));

    links.forEach(link => {
      let scene = link.parentElement;
      new Parallax(scene, {
        relativeInput: true,
        clipRelativeInput: true,
        hoverOnly: true,
        invertX: false,
        invertY: false,
        pointerEvents: true
      });
    });
  }

  render() {
    return (
      <>
        <Header
          linkParallax={this.linksParallax}
          hoverLinks={this.cursorMoveHandler}
          defaultCursor={this.cursorDefault}
        />

        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Main
                animation={this.textAutoShowing}
                linkParallax={this.linksParallax}
                hoverLinks={this.cursorMoveHandler}
                defaultCursor={this.cursorDefault}
              />
            )}
          />
          <Route
            path="/about"
            exact
            component={() => (
              <About
                animation={this.textAutoShowing}
                linkParallax={this.linksParallax}
                hoverLinks={this.cursorMoveHandler}
                defaultCursor={this.cursorDefault}
              />
            )}
          />
          <Route
            path="/test"
            exact
            component={() => (
              <TestPage
                animation={this.textAutoShowing}
                strokeAnimation={this.strokeHoverHandler}
                linkParallax={this.linksParallax}
                hoverLinks={this.cursorMoveHandler}
                defaultCursor={this.cursorDefault}
              />
            )}
          />
          <Route
            path="/questions"
            exact
            component={() => (
              <Questions
                animation={this.textAutoShowing}
                strokeAnimation={this.strokeHoverHandler}
                linkParallax={this.linksParallax}
                hoverLinks={this.cursorMoveHandler}
                defaultCursor={this.cursorDefault}
              />
            )}
          />
          <Route
            path="/results"
            exact
            component={() => (
              <Result
                animation={this.textAutoShowing}
                hoverLinks={this.cursorMoveHandler}
                defaultCursor={this.cursorDefault}
              />
            )}
          />
          <Redirect path="*" to="/" />
        </Switch>

        <div className="cursor">
          <svg height="100%" width="100%">
            <circle cx="50%" cy="50%" r="47.5%" />
          </svg>
        </div>
      </>
    );
  }
}

export default App;
