import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.sass";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import TestPage from "./components/Test/TestPage";
import Header from "./components/Header/Header";
import Questions from "./components/Questions/Questions";
import Result from "./components/Result/Result";

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/about" exact component={About} />
        <Route path="/test" exact component={TestPage} />
        <Route path="/questions" exact component={Questions} />
        <Route path="/results" exact component={Result} />
      </Switch>
    </>
  );
}

export default App;
