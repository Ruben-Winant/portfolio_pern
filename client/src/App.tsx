import React from "react";
import "./App.css";
import MainPage from "./MainPage/MainPage";
import Admin from "./Admin/Admin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovixLandingPage from "./Movix/MovixLandingPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movix">
          <MovixLandingPage />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
