import React from "react";

function Menu(props) {
  return <ul className={props.className}>{props.children}</ul>;
}

export default Menu;
