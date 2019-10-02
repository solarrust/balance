import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TweenMax, Power1 } from "gsap";
import Header from "../Header/Header";
import Arrow from "../SVG/Arrow";
import Menu from "./Menu";
import data from "../../data";

const menuLinks = data.menu;
let index = 0;

class Main extends Component {
  componentDidMount() {
    this.circleChanger();
    this.circleRise();
    this.menuChanger();
  }

  circleRise() {
    let items = Array.from(document.querySelectorAll(".main-circle"));
    let firstItem = items[0];
    if (!index) {
      TweenMax.fromTo(
        firstItem,
        1.5,
        { scale: 0.1 },
        { scale: 1, ease: Power1.easeOut }
      );
    }
  }

  circleChanger() {
    let circleParent = document.querySelector(".main-circles");
    let circleItems = Array.from(document.querySelectorAll(".main-circle"));
    circleParent.style.width = 93 * circleItems.length - 1 + "vw";

    function animateCircles(el) {
      let compStylesCircle = window.getComputedStyle(circleItems[index]);
      let circleWidth = parseInt(compStylesCircle.getPropertyValue("width"));

      if (!index) {
        TweenMax.to(el, 0, { x: 0 });
      } else {
        TweenMax.to(el, 1.5, { x: -(circleWidth * index) + "px" });
      }
    }

    function shrinkCircle(el) {
      TweenMax.fromTo(
        el,
        1.5,
        { scale: 1 },
        { scale: 0.9, ease: Power1.easeOut }
      );
    }

    function stretchCircle(el) {
      TweenMax.fromTo(
        el,
        1.5,
        { scale: 0.5 },
        { scale: 1, ease: Power1.easeOut }
      );
    }

    setInterval(() => {
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
        0.8,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, ease: Power1.easeOut }
      );
    }

    setInterval(() => {
      toggleClass(menuItems[index]);
      changeNumber(number);
    }, 5000);
  }

  render() {
    return (
      <>
        <div className="main">
          <div className="main-circles">
            {menuLinks.map((link, index) => (
              <div className="main-circle" key={index}></div>
            ))}
          </div>
          <Header />
          <div className="main-content">
            <div className="main-content__wrapper">
              <h1 className="main-content__title">
                how
                <br />
                to&nbsp;find
                <br />
                a&nbsp;balance
              </h1>
              <div className="main-content__block">
                <p className="main-content__text text">
                  The Balance map is&nbsp;a&nbsp;tool by&nbsp;which you can
                  analyze your priorities and find out in&nbsp;which area
                  of&nbsp;life you need to&nbsp;make an&nbsp;effort
                  to&nbsp;achieve inner harmony, regain a&nbsp;positive attitude
                  and start living a&nbsp;full life.
                </p>
                <Link to="/test" className="main-content__link link">
                  begin <Arrow />
                </Link>
              </div>
            </div>
            <Menu className="main-content__menu main-menu">
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
