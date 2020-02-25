import React, { Component } from "react";
import { TweenMax } from "gsap";
import Menu from "../Main/Menu";
let resultCircles;
let parent;
let circleSize = 93;

class ColView extends Component {
  constructor(props) {
    super(props);
    this.activeCircle = this.activeCircle.bind(this);
  }

  componentDidMount() {
    resultCircles = Array.from(
      document.querySelectorAll(".results-wrapper > div")
    );
    parent = document.querySelector(".results-wrapper");
    this.innerAnimation();
  }

  innerAnimation() {
    let height =
      resultCircles.length * (document.body.offsetHeight / 100) * circleSize;
    parent.style.height = height + "px";

    resultCircles.map((el, i) => {
      let children = Array.from(el.children);
      el.style.width = circleSize + "vmax";
      el.style.height = circleSize + "vmax";

      TweenMax.fromTo(
        el,
        0.2 * (resultCircles.length - 1),
        { zIndex: -i },
        {
          bottom: `${50 * i}vmax`
          // y: "-50%"
          // marginTop: "-50%"
          // scale: (1 - (1 / (resultCircles.length - 1)) * i)
        }
      );

      children.forEach((child, i) => {
        // TweenMax.fromTo(child, 2, { opacity: 0 }, { delay: i * 2, opacity: 1 });
      });
    });

    this.activeCircle(0);
  }

  activeCircle(index) {
    // let circleAnimation = () =>
    //   TweenMax.to(resultCircles[index], 0.05, {
    //     scale: 1
    //   });
    resultCircles.forEach(el => {
      el.classList.remove("_active");
      // TweenMax.to(el, 0.5, { scale: 0.1 });
    });

    let positionOfCircle = getComputedStyle(resultCircles[index]);

    let menuLink = Array.from(
      document.querySelectorAll("[data-test-menu-link]")
    )[index];

    TweenMax.to(parent, 0.1 * (resultCircles.length - 1), {
      bottom: `-${parseInt(positionOfCircle.bottom) +
        (document.body.offsetWidth / 100) * 60}px`
      // onComplete: circleAnimation
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
  };

  render() {
    let levels = [];
    this.props.grades.map((grade, i) => {
      if (grade) {
        if (grade > 5) {
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
            >
              {question.sphere}
              <span className={`test-menu__level _${levels[i]}`}>
                {levels[i] === "low"
                  ? "Below Average"
                  : levels[i] === "high"
                  ? "Just Fine"
                  : "Midpoint"}
              </span>
              <span
                className={"test-menu__circle"}
                style={{
                  background: `linear-gradient(${question.bkg})`
                }}
              />
              <span className={"test-menu__grade"}>{this.props.grades[i]}</span>
            </li>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ColView;
