import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import './index.css'

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <App />
  </Router>,
  document.getElementById("root")
);
