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

  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/about" exact component={About} />
          <Route path="/test" exact component={TestPage} />
          <Route path="/questions" exact component={Questions} />
          <Route path="/results" exact component={Result} />
        </Switch>

        <div className="cursor"></div>
      </>
    );
  }
}

export default App;
