import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if (import.meta.env.VITE_NODE_ENV === "production") {
  const noop = () => {};

  window.console = {
    ...window.console,
    log: noop,
    warn: noop,
    error: noop,
  };
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element with id "root" not found in the document.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
    <div id="modal" className="portal"></div>
    <div id="toast" className="portal"></div>
  </React.StrictMode>
);
