import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
if (import.meta.env.VITE_NODE_ENV === "production") {
  window.console = {
    log: () => {},
    warn: () => {},
    error: () => {}
  };
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <App />
    <div id="modal" className="portal"></div>
    <div id="toast" className="portal"></div>
  </React.StrictMode>);