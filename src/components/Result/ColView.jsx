import React, { Component } from "react";
import { TweenMax } from "gsap";

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

    resultCircles.map((el, i) => {
      TweenMax.fromTo(
        el,
        0.5 * (resultCircles.length - 1),
        { width: 0, height: 0, bottom: "50%", zIndex: -i },
        {
          width: `${17 * this.props.grades[i]}vmin`,
          height: `${17 * this.props.grades[i]}vmin`,
          bottom: `${30 * i}%`,
          scale: 0.4
        }
      );
      let children = Array.from(el.children);

      children.forEach(child => {
        TweenMax.fromTo(child, 2, { opacity: 0 }, { delay: 1, opacity: 1 });
      });
    });

    this.activeCircle(resultCircles[0], 0);
  };

  activeCircle(element, index) {
    TweenMax.to(element, 0.5, { scale: 1 });
    let menuLink = Array.from(
      document.querySelectorAll("[data-test-menu-link]")
    )[index];
    let menuLinkCircle = menuLink.querySelector(".test-menu__circle");
    // TweenMax.to(menuLink, 0.2, { color: "#000" });
    // TweenMax.to(menuLinkCircle, 0.2, {
    //   borderWidth: 0
    // });
    // TweenMax.to(menuLinkCircle, 1, {
    //   delay: 1,
    //   opacity: 1,
    //   width: 36,
    //   height: 36
    // });
  }

  render() {
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
              <div className="result-circle__grade">{grade}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ColView;
