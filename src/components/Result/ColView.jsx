import React, { Component } from "react";
import { TweenMax } from "gsap";
import Menu from "../Main/Menu";

let resultCircles;
let parent;
let circleSize = 93;
let windowWidth;

class ColView extends Component {
  constructor(props) {
    super(props);
    this.activeCircle = this.activeCircle.bind(this);
  }

  componentDidMount() {
    resultCircles = Array.from(document.querySelectorAll(".result-circle"));
    parent = document.querySelector(".results-wrapper");

    windowWidth = document.documentElement.clientWidth;

    this.innerAnimation();
  }

  innerAnimation() {
    // if (windowWidth <= 768) {
    //   circleSize = 83;
    // }

    let height =
      resultCircles.length * (document.body.offsetHeight / 100) * circleSize;
    parent.style.height = height + "px";

    resultCircles.forEach((el, i) => {
      el.style.width = circleSize + "vmax";
      el.style.height = circleSize + "vmax";

      let bottom = `${41 * i}vmax`;

      TweenMax.fromTo(
        el,
        0.2 * (resultCircles.length - 1),
        { zIndex: -i },
        {
          bottom: bottom
        }
      );
    });

    this.activeCircle(0);
    this.bkgForMenuItem(0);
  }

  activeCircle(index) {
    resultCircles.forEach(el => {
      el.classList.remove("_active");
    });

    let positionOfCircle = getComputedStyle(resultCircles[index]);

    console.log(positionOfCircle.bottom);

    let menuLink = Array.from(
      document.querySelectorAll("[data-test-menu-link]")
    )[index];

    let multiplier = 60;

    if (windowWidth <= 768) {
      multiplier = 50;
    }

    TweenMax.to(parent, 0.08 * (resultCircles.length - 1), {
      bottom: `-${parseInt(positionOfCircle.bottom) +
        (document.body.offsetWidth / 100) * multiplier}px`
    });
    resultCircles[index].classList.add("_active");
    menuLink.classList.add("_active");
  }

  changeActiveHandler = e => {
    document.querySelectorAll("[data-test-menu-link]").forEach(el => {
      el.classList.remove("_active");
    });
    e.target.classList.add("_active");
    this.activeCircle(e.target.getAttribute("data-test-menu-link"));
    this.bkgForMenuItem(e.target.getAttribute("data-test-menu-link"));
  };

  bkgForMenuItem(index) {
    let menuItems = document.querySelectorAll(
      "[data-test-menu-link] .test-menu__circle"
    );
    menuItems.forEach(item => (item.style.backgroundImage = "none"));
    menuItems[
      index
    ].style.backgroundImage = `linear-gradient(${this.props.items[index].bkg})`;
  }

  render() {
    let levels = [];
    this.props.grades.map((grade, i) => {
      if (grade) {
        if (grade > 7) {
          levels[i] = "high";
        } else if (grade < 5) {
          levels[i] = "low";
        } else {
          levels[i] = "middle";
        }
      }
      return levels[i];
    });

    return (
      <div className="results-wrapper _col">
        {this.props.grades.map((grade, i) => {
          return (
            <div
              className={"result-circle"}
              style={{
                backgroundImage: `linear-gradient(${this.props.items[i].bkg})`
              }}
              index={i}
              key={i}
            >
              <div className="result-circle__name">
                {this.props.items[i].sphere}
              </div>
              <div className={`result-circle__recommendation _${levels[i]}`}>
                {this.props.items[i].recommendations[levels[i]]}
              </div>
            </div>
          );
        })}
        <Menu className="main-menu questions-menu test-menu">
          {this.props.items.map((question, i) => (
            <li
              className="main-menu__link text test-menu__item"
              key={i}
              data-test-menu-link={i}
              onClick={this.changeActiveHandler}
              data-hover-trigger
            >
              {question.sphere}
              <span className={`test-menu__level _${levels[i]}`}>
                {levels[i] === "low"
                  ? "Below Average"
                  : levels[i] === "high"
                  ? "Just Fine"
                  : "Midpoint"}
              </span>
              <div className="test-menu__circle-parent" data-parallax-scene>
                <span
                  className="test-menu__circle"
                  data-parallax
                  data-depth="0.5"
                />
              </div>

              <span className={"test-menu__grade"}>{this.props.grades[i]}</span>
            </li>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ColView;
