import React, { Component } from "react";

class QuestionPreloader extends Component {
  bgImage(imgName) {
    const imageUrl = require(`../../img/${imgName}`);

    return (
      <img
        className="preloader__img"
        src={imageUrl}
        rel="prefetch"
        rel="preload"
        alt="preloader photo"
        aria-hidden="true"
      />
    );
  }

  render() {
    const { gradient, image, index, sphere } = this.props;

    return (
      <>
        <div
          className={`preloader test-card__preloader question__preloader _${index}`}
          // style={{
          //   background: `linear-gradient(${gradient})`
          // }}
        >
          <canvas data-gradient="preloader" />

          {this.bgImage(image)}
          <div className="preloader__content">
            <span className="preloader__text _left">balance</span>
            <div className="preloader__logo inner-logo">
              <div className="inner-logo__circle _half" />
              <div className="inner-logo__circle _full">
                <span className="preloader__text _center">your</span>
              </div>
            </div>
            <span className="preloader__text _right">{sphere}</span>
          </div>
        </div>
      </>
    );
  }
}

export default QuestionPreloader;
