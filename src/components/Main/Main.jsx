import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import TestPage from "../Test/TestPage";
import Arrow from "../SVG/Arrow";
import Menu from "./Menu";
import data from "../../data";

const menuLinks = data.menu;

function Main() {
  return (
    <>
      <div className="main">
        <Header />
        <div className="main-content">
          <h1 className="main-content__title">
            how to&nbsp;find a&nbsp;balance
          </h1>
          <div className="main-content__block">
            <p className="main-content__text text">
              The Balance map is&nbsp;a&nbsp;tool by&nbsp;which you can analyze
              your priorities and find out in&nbsp;which area of&nbsp;life you
              need to&nbsp;make an&nbsp;effort to&nbsp;achieve inner harmony,
              regain a&nbsp;positive attitude and start living a&nbsp;full life.
            </p>
            <Link to={TestPage} className="main-content__link link">
              begin <Arrow />
            </Link>
          </div>
          <Menu className="main-content__menu main-menu">
            {menuLinks.map(link => (
              <li className="main-menu__link link">{link}</li>
            ))}
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Main;
