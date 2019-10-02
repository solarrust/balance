import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.sass";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import TestPage from "./components/Test/TestPage";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/about" exact component={About} />
      <Route path="/test" exact component={TestPage} />
    </Switch>
  );
}

export default App;
