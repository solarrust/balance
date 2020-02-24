import React, { Component } from "react";
import { TweenMax } from "gsap";
import Menu from "../Main/Menu";

class ColView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.innerAnimation();
  }

  innerAnimation = () => {
    let resultCircles = Array.from(
      document.querySelectorAll(".results-wrapper > div")
    );
    let parent = document.querySelector(".results-wrapper");
    let height = 0;

    resultCircles.map((el, i) => {
      TweenMax.fromTo(
        el,
        0.5 * (resultCircles.length - 1),
        { width: 0, height: 0, zIndex: -i, bottom: 0, scale: 0 },
        {
          width: `93vmax`,
          height: `93vmax`,
          bottom: `${60 * i}vmax`,
          scale: 0.2
        }
      );
      height += (document.body.offsetHeight / 100) * 93;
      let children = Array.from(el.children);

      children.forEach(child => {
        TweenMax.fromTo(child, 2, { opacity: 0 }, { delay: 1, opacity: 1 });
      });
    });

    parent.style.height = height + "px";

    this.activeCircle(resultCircles[0], 0);
  };

  activeCircle(element, index) {
    TweenMax.to(element, 0.5, { scale: 1 });
    let menuLink = Array.from(
      document.querySelectorAll("[data-test-menu-link]")
    )[index];
    element.classList.add("_active");
    menuLink.classList.add("_active");
  }

  changeActiveHandler(e) {
    document.querySelectorAll("[data-test-menu-link]").forEach(el => {
      el.classList.remove("_active");
    });
    e.target.classList.add("_active");
  }

  render() {
    let levels = [];
    this.props.grades.map((grade, i) => {
      if (grade) {
        if (grade > 5) {
          levels[i] = "high";
          // menuNote = "Just Fine";
        } else if (grade < 5) {
          levels[i] = "low";
          // menuNote = "Below Average";
        } else {
          levels[i] = "middle";
          // menuNote = "Midpoint";
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
                {levels[i]}
              </span>
              <span
                className={"test-menu__circle"}
                style={{
                  background: `linear-gradient(${question.bkg})`
                }}
              ></span>
            </li>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ColView;
