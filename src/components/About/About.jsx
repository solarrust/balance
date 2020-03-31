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
import Menu from "../Main/Menu";
import data from "../../data.json";
import img from "../../img/balance-card.jpg";
import Arrow from "../SVG/Arrow";
import CircleBkg from "../../img/about-ellipse.png";
import GooseBkg from "../../img/goose-bkg.png";
import NatashaPic from "../../img/Natasha.png";
import DanilinaPic from "../../img/Danilina.png";
import ElenaPic from "../../img/Elena.png";
import ElinaPic from "../../img/Elina.png";
import AlenaPic from "../../img/Alena.png";

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
                      <div className="about-card">
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
                          <p className="page-content__text text" data-auto-show>
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
                      </div>
                    )}
                  />
                  <Route
                    path="/dates"
                    render={() => (
                      <div className="about-card">
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
                          <p className="page-content__text text" data-auto-show>
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
                      </div>
                    )}
                  />
                  <Route
                    path="/diagnostics"
                    render={() => (
                      <div className="about-card">
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
                          <p className="page-content__text text" data-auto-show>
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
                      </div>
                    )}
                  />
                  <Route
                    path="/total"
                    render={() => (
                      <div className="about-card">
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
                          <p className="page-content__text text" data-auto-show>
                            The result is&nbsp;the creation
                            of&nbsp;an&nbsp;individual Balance Card, which
                            clearly shows the most problematic area. Then
                            we&nbsp;create a&nbsp;small encouraging further
                            actions recommendation based on&nbsp;the answers,
                            which will help to&nbsp;make a&nbsp;difference.
                          </p>
                          <Link
                            to="/team"
                            className="page-content__link about-card__link link"
                          >
                            next <Arrow />
                          </Link>
                        </div>
                      </div>
                    )}
                  />
                  <Route
                    path="/team"
                    render={() => (
                      <div className="about-card">
                        <div className="page-content__block about-card-content _team">
                          <div className="about-card__team team-container">
                            <div className="team-item">
                              <div className="team-item__picture">
                                <img src={NatashaPic} alt="" />
                              </div>
                              <div className="team-item__content">
                                <h3 className="team-item__name">
                                  Natasha Yankelevich
                                </h3>
                                <span className="team-item__position">
                                  Photography
                                </span>
                                <ul className="team-item__social-list social-list">
                                  <li className="social-list__item _fb">
                                    <a
                                      target="_blank"
                                      href="https://facebook.com/"
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="team-item">
                              <div className="team-item__picture">
                                <img src={DanilinaPic} alt="" />
                              </div>
                              <div className="team-item__content">
                                <h3 className="team-item__name">
                                  Natasha Danilina
                                </h3>
                                <span className="team-item__position">
                                  Copywriter
                                </span>
                                <ul className="team-item__social-list social-list">
                                  <li className="social-list__item _fb">
                                    <a
                                      target="_blank"
                                      href="https://facebook.com/"
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="team-item">
                              <div className="team-item__picture">
                                <img src={ElenaPic} alt="" />
                              </div>
                              <div className="team-item__content">
                                <h3 className="team-item__name">
                                  Elena Saharova
                                </h3>
                                <span className="team-item__position">
                                  Idea & Web design
                                </span>
                                <ul className="team-item__social-list social-list">
                                  <li className="social-list__item _fb">
                                    <a
                                      target="_blank"
                                      href="https://facebook.com/"
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="team-item">
                              <div className="team-item__picture">
                                <img src={ElinaPic} alt="" />
                              </div>
                              <div className="team-item__content">
                                <h3 className="team-item__name">
                                  Elina Chanieva
                                </h3>
                                <span className="team-item__position">
                                  Logo & Web design
                                </span>
                                <ul className="team-item__social-list social-list">
                                  <li className="social-list__item _fb">
                                    <a
                                      target="_blank"
                                      href="https://facebook.com/"
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="team-item">
                              <div className="team-item__picture">
                                <img src={AlenaPic} alt="" />
                              </div>
                              <div className="team-item__content">
                                <h3 className="team-item__name">
                                  Alena Batitskaya
                                </h3>
                                <span className="team-item__position">
                                  Frontend & Backend
                                </span>
                                <ul className="team-item__social-list social-list">
                                  <li className="social-list__item _fb">
                                    <a
                                      target="_blank"
                                      href="https://www.facebook.com/ABatickaya"
                                    />
                                  </li>
                                  <li className="social-list__item _tw">
                                    <a
                                      target="_blank"
                                      href="https://twitter.com/ABatickaya"
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <a
                            href="/"
                            className="page-content__link about-card__link link"
                          >
                            go to the main page <Arrow />
                          </a>
                        </div>
                      </div>
                    )}
                  />
                  <Redirect from="/" to="/balance-card" />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
        <h1 className="about__title lead-title" data-auto-show-title>
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
