import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import { userCheck } from "lib/api/authApi";
import "./lib/interceptors/axios";
import { AuthStore } from "lib/zustand/auth";

axios.defaults.withCredentials = true;

const reloadUser = async () => {
  try {
    await AuthStore.getState().check();
  } catch (e) {
    console.log("reload Error");
  }
};

reloadUser();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
