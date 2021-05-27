import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import StateProvider from "./state/state";
import { reducer } from "./state/reducer";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </StateProvider>,
  document.getElementById("root")
);
