import React from "react";
import "./App.css";
import MainPage from "./MainPage/MainPage";
import Admin from "./Admin/Admin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
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
