import React from "react";
import {
  HashRouter,
  Link,
  NavLink,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AboutCard from "./AboutCard";
import Menu from "../Main/Menu";
import data from "../../data.json";
import img from "../../img/balance-card.jpg";
import Arrow from "../SVG/Arrow";
import CircleBkg from "../../img/about-ellipse.png";
import GooseBkg from "../../img/goose-bkg.png";

const menuLinks = data.aboutMenu;

// TODO: Менять цвет логотипа на последнем слайде
// TODO: Добавить анимацию на пропадание слайда + на появление слайда
// TODO: Добавить анимации декоративным элементам

function About() {
  return (
    <HashRouter>
      <div className="page about">
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={600}
              >
                <Switch location={location}>
                  <Route
                    path="/balance-card"
                    render={() => (
                      <AboutCard>
                        <div
                          data-animated-circle
                          className="about-circle balance-circle"
                          aria-hidden="true"
                        />
                        <div
                          className="about-card__img-block"
                          aria-hidden="true"
                        >
                          <img className="about-card__img" src={img} alt="" />
                        </div>
                        <div className="page-content__block about-card-content">
                          <p className="page-content__text text">
                            The balance card is&nbsp;a&nbsp;tool by&nbsp;which
                            you analyze your priorities and find out
                            in&nbsp;which area of&nbsp;life you need
                            to&nbsp;make an&nbsp;effort to&nbsp;achieve inner
                            harmony, regain a&nbsp;positive attitude and start
                            living a&nbsp;full life.
                          </p>
                          <Link
                            to="/dates"
                            className="page-content__link about-card__link link"
                          >
                            next <Arrow />
                          </Link>
                        </div>
                      </AboutCard>
                    )}
                  />
                  <Route
                    path="/dates"
                    render={() => (
                      <AboutCard>
                        <div
                          data-animated-circle
                          className="about-circle dates-circle"
                          aria-hidden="true"
                        />
                        <div
                          className="about-decoration _years"
                          aria-hidden="true"
                        >
                          70s
                        </div>
                        <div
                          data-animated-text
                          className="about-decoration _usa bkg-title"
                          aria-hidden="true"
                        >
                          usa
                        </div>
                        <div className="page-content__block about-card-content _dates-content">
                          <p className="page-content__text text">
                            Our solution to&nbsp;this problem was to&nbsp;create
                            a&nbsp;balance card, which is&nbsp;based on&nbsp;the
                            well-known exercise &laquo;Wheel of&nbsp;Life
                            Balance&raquo;. It&nbsp;appeared in&nbsp;the USA
                            at&nbsp;the end of&nbsp;the 70s of&nbsp;the 20th
                            century and soon turned into one of&nbsp;the most
                            popular coaching techniques in&nbsp;the world. The
                            essence of&nbsp;the exercise
                            is&nbsp;to&nbsp;visually depict the basic values
                            of&nbsp;a&nbsp;person in&nbsp;the form
                            of&nbsp;a&nbsp;drawing, where they are represented
                            as&nbsp;the radii of&nbsp;the life circle
                            or&nbsp;wheel spokes.
                          </p>
                          <Link
                            to="/diagnostics"
                            className="page-content__link about-card__link link"
                          >
                            next <Arrow />
                          </Link>
                        </div>
                      </AboutCard>
                    )}
                  />
                  <Route
                    path="/diagnostics"
                    render={() => (
                      <AboutCard>
                        <div
                          data-animated-circle
                          className="about-circle diagnostics-circle"
                          aria-hidden="true"
                        />
                        <div
                          className="about-decoration _photo-circle"
                          style={{
                            backgroundImage: `url(${CircleBkg})`
                          }}
                          aria-hidden="true"
                        >
                          <div
                            className="about-decoration _small-circle"
                            aria-hidden="true"
                            data-animated-circle
                          />
                        </div>

                        <div className="page-content__block about-card-content">
                          <p className="page-content__text text">
                            Diagnostics on&nbsp;the balance wheel is&nbsp;very
                            approximate&nbsp;&mdash; it&nbsp;depends on&nbsp;the
                            mood of&nbsp;a&nbsp;person and many other factors.
                            To&nbsp;make it&nbsp;more accurate, we&nbsp;offer
                            the user to&nbsp;answer eight simple questions, each
                            of&nbsp;which is&nbsp;devoted
                            to&nbsp;a&nbsp;particular area of&nbsp;life. The
                            question has parameters that need
                            to&nbsp;be&nbsp;evaluated on&nbsp;a&nbsp;ten-point
                            scale. Estimates make it&nbsp;clear how satisfied
                            a&nbsp;person is&nbsp;with one area or&nbsp;another.
                          </p>
                          <Link
                            to="/total"
                            className="page-content__link about-card__link link _diagnostics"
                          >
                            next <Arrow />
                          </Link>
                        </div>
                      </AboutCard>
                    )}
                  />
                  <Route
                    path="/total"
                    render={() => (
                      <AboutCard>
                        <div
                          data-animated-circle
                          className="about-circle total-circle"
                          aria-hidden="true"
                        />
                        <div
                          className="about-decoration _goose-circle"
                          aria-hidden="true"
                          style={{
                            backgroundImage: `url(${GooseBkg})`
                          }}
                        />

                        <div className="page-content__block about-card-content">
                          <p className="page-content__text text">
                            The result is&nbsp;the creation
                            of&nbsp;an&nbsp;individual balance sheet, which
                            clearly shows which area is&nbsp;the most
                            problematic. Based on&nbsp;the answers, we&nbsp;form
                            a&nbsp;small encouraging recommendation for further
                            actions in&nbsp;this direction, which will help
                            to&nbsp;change the situation for the better.
                          </p>
                          <a
                            href="/"
                            className="page-content__link about-card__link link"
                          >
                            go to the main page <Arrow />
                          </a>
                        </div>
                      </AboutCard>
                    )}
                  />
                  <Redirect from="/" to="/balance-card" />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
        <h1 className="about__title lead-title">
          about
          <br />
          project
        </h1>
        <Menu className="main-menu">
          {menuLinks.map((link, index) => (
            <li className="main-menu__link text" key={index}>
              <NavLink className="main-menu__link-item" to={link.pageLink}>
                {link.pageName}
              </NavLink>
            </li>
          ))}
        </Menu>
      </div>
    </HashRouter>
  );
}

export default About;
