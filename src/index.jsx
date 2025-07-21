import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./common/utils/store";

// production에서 로그 방지
if (import.meta.env.VITE_NODE_ENV === "production") {
  window.console = {
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <div id="modal" className="portal"></div>
      <div id="toast" className="portal"></div>
    </Provider>
  </React.StrictMode>
);


