import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/hooks/auth";
import { ToastContainer } from "react-toastify";

import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import config from "./config";

const app = (
  <>
    <BrowserRouter basename={config.basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
