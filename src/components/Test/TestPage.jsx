import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../SVG/Arrow";

// TODO: добить плавное (побуквенное) изменение аутлайного текста по ховеру

class TestPage extends React.Component {
  componentDidMount() {
    this.hoverHandler();
  }

  hoverHandler = () => {
    let links = Array.from(document.querySelectorAll("[data-trigger-link]"));

    let text = this.strokeCopying();

    links.forEach(link => {
      link.onmouseenter = () => {
        text.classList.add("_triggered");
      };

      link.onmouseleave = () => {
        text.classList.remove("_triggered");
      };
    });
  };

  strokeCopying = () => {
    let text = document.querySelector("[data-triggered-text]");

    if (text) {
      let textClasses = text.classList;

      let copyText = document.createElement("h3");
      copyText.classList = textClasses;
      copyText.classList.add("_copy");
      copyText.setAttribute("aria-hidden", "true");
      copyText.innerHTML = text.innerHTML;
      text.after(copyText);
    }

    return text;
  };

  render() {
    return (
      <div className="page test">
        <div className="test-card _main">
          <div
            className="test-decoration _circle"
            aria-hidden="true"
            data-animated-circle
          />
          <h2 className="test-header lead-title" data-auto-show>
            you need to&nbsp;answer a&nbsp;few question now
          </h2>
          <h3
            className="test-subheader _stroke-text bkg-title"
            data-animated-text
            data-triggered-text
          >
            <span>are</span>
            <span>you</span>
            <span>ready?</span>
          </h3>
          <p className="test-text text" data-auto-show>
            To&nbsp;draw up&nbsp;your Balance Card we&nbsp;will ask eight
            questions about the main areas of&nbsp;life. Each question has
            parameters, which will help&nbsp;us to&nbsp;identify how satisfied
            you are with this area. Your task is&nbsp;to&nbsp;evaluate the
            parameters on&nbsp;a&nbsp;scale from 1&nbsp;to&nbsp;10. And one more
            thing&nbsp;&mdash; please, answer as&nbsp;honestly as&nbsp;possible!
          </p>
          <Link
            to="/questions"
            className="page-content__link test-link link"
            data-trigger-link
          >
            Let&rsquo;s go <Arrow />
          </Link>
        </div>
      </div>
    );
  }
}

export default TestPage;
