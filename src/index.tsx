import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import StateProvider from "./state/state";
import { reducer } from "./state/reducer";

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StateProvider>,
  document.getElementById("root")
);
