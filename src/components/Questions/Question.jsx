import React, { Component } from "react";
import Arrow from "../SVG/Arrow";
import { Link } from "react-router-dom";

class Question extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.props.onQuestionChange(this.props.index);
  }

  render() {
    const grades = [];
    for (let i = 0; i < 10; i++) {
      grades.push(
        <li key={i} className="grade__item" onClick={this.props.onChange}>
          {i + 1}
        </li>
      );
    }

    return (
      <div className="test-card question">
        <div className="counter question-counter">
          <span className="counter__number">{this.props.index + 1}</span>
          <span className="counter__static"> of 8</span>
        </div>
        <h3 className="question__decoration _stroke-text bkg-title">
          question
        </h3>
        <h2 className="question__title lead-title">
          {this.props.question.title}
        </h2>
        <div className="question__btns nav-btns">
          {this.props.btnShower(this.props.index)}
        </div>
        <ul className="question-grade grade">{grades.map(grade => grade)}</ul>
        <div className="grade__note _low">{this.props.question.range[0]}</div>
        <div className="grade__note _high">{this.props.question.range[1]}</div>
      </div>
    );
  }
}

export default Question;
