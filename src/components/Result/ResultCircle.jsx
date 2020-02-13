import React from "react";

export default function ResultCircle(props) {
  return (
    <div
      on
      className={"result-circle"}
      data-result-circle
      // style={{
      //   backgroundImage: `linear-gradient(${props.bkg})`,
      //   width: `calc(${7.96 * props.grade}vmin)`,
      //   height: `calc(${7.96 * props.grade}vmin)`,
      //   left: `${12.5 * props.index}vmax`
      // }}
    >
      {props.children}
    </div>
  );
}
