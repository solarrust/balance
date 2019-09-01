import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.sass";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Test from "./components/Test/Test";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/about" exact component={About} />
      <Route path="/test" exact component={Test} />
    </Switch>
  );
}

export default App;
