import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TweenMax, Power1 } from "gsap";
import Arrow from "../SVG/Arrow";
import Menu from "./Menu";
import data from "../../data";

const menuLinks = data.mainMenu;
let index = 0;
let animationTime = 0.3;

// TODO: переписать анимацию кругов

class Main extends Component {
  circleChangerInterval = 0;
  menuChangerInterval = 0;

  componentDidMount() {
    this.circleChanger();
    this.menuChanger();
    document.addEventListener("visibilitychange", this.visibilityHandler);
  }

  componentWillUnmount() {
    index = 0;
    clearInterval(this.circleChangerInterval);
    clearInterval(this.menuChangerInterval);
  }

  visibilityHandler = () => {
    if (document.visibilityState !== "visible") {
      clearInterval(this.circleChangerInterval);
      clearInterval(this.menuChangerInterval);
    } else {
      this.circleChanger();
      this.menuChanger();
    }
  };

  circleChanger() {
    let circleParent = document.querySelector(".main-circles");
    let circleItems = Array.from(document.querySelectorAll(".main-circle"));

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
      // firstItem.style.transform = "matrix(1, 0, 0, 0.1, 0, 0)";

      TweenMax.fromTo(
        firstItem,
        1,
        { scale: animationTime },
        { scale: 1, ease: Power1.easeOut }
      );
    }

    function shrinkCircle(el) {
      // TweenMax.fromTo(
      //   el,
      //   0.5,
      //   { scale: 1 },
      //   {
      //     scale: 0.99,
      //     ease: Power1.easeOut
      //   }
      // );
      el.classList.add("_half");
    }

    function stretchCircle(el) {
      // TweenMax.fromTo(
      //   el,
      //   1.5,
      //   { scale: 0.5 },
      //   {
      //     scale: 1,
      //     ease: Power1.easeOut
      //   }
      // );
    }

    this.circleChangerInterval = setInterval(() => {
      index < circleItems.length - 1 ? index++ : (index = 0);
      animateCircles(circleParent);
      if (index > 0) {
        shrinkCircle(circleItems[index - 1]);
      }
      stretchCircle(circleItems[index]);
    }, 5000);
  }

  menuChanger() {
    let menuItems = Array.from(document.querySelectorAll(".main-menu__link"));
    let number = document.querySelector(".main-menu__number");
    let activeClass = "_active";
    menuItems[index].classList.add(activeClass);

    function toggleClass(el) {
      menuItems.forEach(child => child.classList.remove(activeClass));
      el.classList.add(activeClass);
    }

    function changeNumber(el) {
      el.textContent = index + 1;
      TweenMax.fromTo(
        el,
        animationTime,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, ease: Power1.easeOut }
      );
    }

    this.menuChangerInterval = setInterval(() => {
      toggleClass(menuItems[index]);
      changeNumber(number);
    }, 5000);
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
              <h1 className="page-content__title lead-title">
                how
                <br />
                to&nbsp;find
                <br />
                a&nbsp;balance
              </h1>
              <div className="page-content__block">
                <p className="page-content__text text">
                  The Balance Card is&nbsp;a&nbsp;tool to&nbsp;help you
                  to&nbsp;analyze your priorities and find out the area
                  of&nbsp;life you need to&nbsp;make efforts
                  in&nbsp;to&nbsp;achieve inner harmony, restore a&nbsp;positive
                  attitude and start living a&nbsp;full life.
                </p>
                <Link to="/test" className="page-content__link link">
                  start <Arrow />
                </Link>
              </div>
            </div>
            <Menu className="page-content__menu main-menu">
              {menuLinks.map((link, index) => (
                <li className="main-menu__link text" key={index}>
                  {link}
                </li>
              ))}
              <li className="main-menu__number">1</li>
            </Menu>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
