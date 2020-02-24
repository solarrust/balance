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
                            The life of&nbsp;a&nbsp;modern person, more than
                            ever in&nbsp;history, has many areas where you need
                            to&nbsp;succeed in&nbsp;order to&nbsp;feel
                            successful. Due to&nbsp;the enormous speed
                            of&nbsp;life, people do&nbsp;not have time
                            to&nbsp;analyze and determine their life priorities.
                            Finally, they can&rsquo;t monitor the reasons
                            of&nbsp;feeling so&nbsp;depressed and unhappy.
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
                            Our solution to&nbsp;this problem
                            is&nbsp;to&nbsp;create a&nbsp;Balance Card based
                            on&nbsp;the well-known exercise &laquo;Wheel
                            of&nbsp;Life Balance&raquo;. It&nbsp;originated
                            in&nbsp;the United States in&nbsp;the late 70s
                            of&nbsp;the&nbsp;XX century and soon became one
                            of&nbsp;the most popular coaching techniques
                            in&nbsp;the world. Exercise essence
                            is&nbsp;to&nbsp;visually represent the basic values
                            of&nbsp;a&nbsp;person as&nbsp;a&nbsp;drawing, where
                            they are shown as&nbsp;the radius
                            of&nbsp;a&nbsp;vital circle or&nbsp;wheel spokes.
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
                            Diagnostics based on&nbsp;the balance wheel
                            is&nbsp;very approximate&nbsp;&mdash;
                            it&nbsp;depends on&nbsp;the mood of&nbsp;the person
                            and many other factors. To&nbsp;make it&nbsp;more
                            accurate, we&nbsp;invite the user to&nbsp;answer
                            eight simple questions, each of&nbsp;which
                            is&nbsp;dedicated to&nbsp;a&nbsp;specific area
                            of&nbsp;life. The question has parameters, which are
                            needed to&nbsp;be&nbsp;evaluated
                            on&nbsp;a&nbsp;ten-point scale. According
                            to&nbsp;estimates, it&nbsp;becomes clear how
                            satisfied a&nbsp;person is&nbsp;with
                            a&nbsp;particular area.
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
                            of&nbsp;an&nbsp;individual Balance Card, which
                            clearly shows the most problematic area. Then
                            we&nbsp;create a&nbsp;small encouraging further
                            actions recommendation based on&nbsp;the answers,
                            which will help to&nbsp;make a&nbsp;difference.
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
