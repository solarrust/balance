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
          <span>are</span>
          <span>you</span>
          <span>ready?</span>
        </h3>
        <p className="test-text text">
          To&nbsp;draw up&nbsp;your Balance Card we&nbsp;will ask eight
          questions about the main areas of&nbsp;life. Each question has
          parameters, which will help&nbsp;us to&nbsp;identify how satisfied you
          are with this area. Your task is&nbsp;to&nbsp;evaluate the parameters
          on&nbsp;a&nbsp;scale from 1&nbsp;to&nbsp;10. And one more
          thing&nbsp;&mdash; please, answer as&nbsp;honestly as&nbsp;possible!
        </p>
        <Link to="/questions" className="page-content__link test-link link">
          Let&rsquo;s go <Arrow />
        </Link>
      </div>
    </div>
  );
}

export default TestPage;
