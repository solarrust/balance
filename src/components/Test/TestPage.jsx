import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../SVG/Arrow";

function TestPage() {
  return (
    <div className="page test">
      <div className="test-card _main">
        <div
          className="test-decoration _circle"
          aria-hidden="true"
          data-animated-circle
        />
        <h2 className="test-header lead-title">
          you need to&nbsp;answer a&nbsp;few question now
        </h2>
        <h3
          className="test-subheader _stroke-text bkg-title"
          data-animated-text
        >
          are you ready?
        </h3>
        <p className="test-text text">
          To&nbsp;create your Balance map, we&nbsp;will ask you eight questions
          about the main areas of&nbsp;your life. Each question has parameters
          by&nbsp;which we&nbsp;determine how satisfied you are with this area.
          Your task is&nbsp;to&nbsp;evaluate the parameters on&nbsp;a&nbsp;scale
          from 1&nbsp;to&nbsp;10. And one more thing&nbsp;&mdash; answer
          as&nbsp;honestly as&nbsp;possible!
        </p>
        <Link to="/questions" className="page-content__link test-link link">
          start <Arrow />
        </Link>
      </div>
    </div>
  );
}

export default TestPage;
