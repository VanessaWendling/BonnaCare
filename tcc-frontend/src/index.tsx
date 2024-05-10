import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./Routes";
import "./index.css";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
