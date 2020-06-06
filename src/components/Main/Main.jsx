import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TweenMax, Power1 } from "gsap";
import Arrow from "../SVG/Arrow";
import data from "../../data";

let index = 0;
let animationTime = 0.3;

class Main extends Component {
  circleChangerInterval = 0;
  menuChangerInterval = 0;

  componentDidMount() {
    this.circleChanger();
    document.addEventListener("visibilitychange", this.visibilityHandler);
    this.props.animation();
    this.props.linkParallax();
    this.props.hoverLinks();
    this.props.defaultCursor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.hoverLinks();
    this.props.defaultCursor();
  }

  componentWillUnmount() {
    index = 0;
    clearInterval(this.circleChangerInterval);
    document.removeEventListener("visibilitychange", this.visibilityHandler);
    this.props.defaultCursor();
  }

  visibilityHandler = () => {
    if (document.visibilityState !== "visible") {
      clearInterval(this.circleChangerInterval);
      clearInterval(this.menuChangerInterval);
    } else {
      this.circleChanger();
    }
  };

  circleChanger() {
    let circleParent = document.querySelector(".main-circles");
    let circleItems = Array.from(document.querySelectorAll(".main-circle"));

    if (circleParent) {
      if (index === 0 || !index) {
        circleItems.forEach(el => el.classList.remove("_half"));
        circleRise();
      }

      function animateCircles(el) {
        let compStylesCircle = window.getComputedStyle(circleItems[index]);
        let circleWidth = parseInt(compStylesCircle.getPropertyValue("width"));

        if (!index) {
          TweenMax.to(el, 0, { x: 0 });
        } else {
          TweenMax.to(el, animationTime * 3, {
            x: -(circleWidth * index) + "px"
          });
        }

        if (index === 0 || !index) {
          circleItems.forEach(el => el.classList.remove("_half"));
        }
      }

      function circleRise() {
        let items = Array.from(document.querySelectorAll(".main-circle"));
        let firstItem = items[0];

        TweenMax.fromTo(
          firstItem,
          1,
          { scale: animationTime },
          { scale: 1, ease: Power1.easeOut }
        );
      }

      function shrinkCircle(el) {
        el.classList.add("_half");
      }

      this.circleChangerInterval = setInterval(() => {
        index < circleItems.length - 1 ? index++ : (index = 0);
        animateCircles(circleParent);
        if (index > 0) {
          shrinkCircle(circleItems[index - 1]);
        }
      }, 3000);
    }
  }

  render() {
    return (
      <>
        <div className="main page">
          <div className="main-circles">
            {data.questions.map((el, index) => (
              <div
                className="main-circle"
                key={index}
                style={{
                  backgroundImage: `linear-gradient(${el.bkg})`
                }}
              />
            ))}
          </div>
          <div className="page-content">
            <div className="page-content__wrapper">
              <h1
                className="page-content__title lead-title"
                data-auto-show-title
                data-splitting=""
              >
                how
                <br />
                to find
                <br />a balance
              </h1>
              <div className="page-content__block">
                <p className="page-content__text text" data-auto-show>
                  The Balance Card is&nbsp;a&nbsp;tool to&nbsp;help you
                  to&nbsp;analyze your priorities and find out the area
                  of&nbsp;life you need to&nbsp;make efforts
                  in&nbsp;to&nbsp;achieve inner harmony, restore a&nbsp;positive
                  attitude and start living a&nbsp;full life.
                </p>
                <Link
                  to="/test"
                  className="page-content__link link"
                  data-hover-trigger
                >
                  start
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
