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
import Parallax from "parallax-js";

// TODO: подключить nanoid и заменить все ключи

let customCursor;

class App extends React.Component {
  state = {
    data: null
  };
  componentDidMount() {
    customCursor = document.querySelector(".cursor");

    this.cursorMoverHandler();
    this.textAutoShowing();
    // this.callBackendAPI()
    //   .then(res => this.setState({ data: res.express }))
    //   .catch(err => console.log(err));
  }

  // callBackendAPI = async () => {
  //   const response = await fetch("/share/:uuid");
  //   const body = await response.json();
  //
  //   if (response.status !== 200) {
  //     throw Error(body.message);
  //   }
  //   return body;
  // };

  cursorMoverHandler = () => {
    document.addEventListener("mousemove", e => {
      let cursorCoords = customCursor.getBoundingClientRect();
      TweenMax.to(customCursor, 0.05, {
        top: `${e.pageY - cursorCoords.width / 2}px`,
        left: `${e.pageX - cursorCoords.width / 2}px`
      });
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

      autoShowingText.innerHTML = autoShowingText.innerHTML.replace(
        /(?![^<]*>)[^<]/g,
        c => `<span>${c}</span>`
      );

      setTimeout(() => {
        Array.from(autoShowingText.children).forEach((ch, i) => {
          TweenMax.fromTo(
            ch,
            0.1,
            {
              opacity: 0,
              y: 5
            },
            { opacity: 1, y: 0, delay: i * 0.03 }
          );
        });
      }, delay);
    }
  };

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
      }, 1000);

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
      }, 1000);
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

  strokeCopying = () => {
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
  };

  bkgParallax() {}

  linksParallax() {
    let links = document.querySelectorAll("[data-parallax-link]");

    links.forEach(link => {
      let scene = link.parentElement;
      let parallaxInstance = new Parallax(scene, {
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
        <Header linkParallax={this.linksParallax} />

        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Main
                animation={this.textAutoShowing}
                linkParallax={this.linksParallax}
              />
            )}
          />
          <Route
            path="/about"
            exact
            component={() => <About animation={this.textAutoShowing} />}
          />
          <Route
            path="/test"
            exact
            component={() => (
              <TestPage
                animation={this.textAutoShowing}
                strokeAnimation={this.strokeHoverHandler}
                linkParallax={this.linksParallax}
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
                bkgParallax={this.bkgParallax}
                linkParallax={this.linksParallax}
              />
            )}
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
