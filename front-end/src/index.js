import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store, saveToLocalStorage } from "./store/store/store";

export const history = createBrowserHistory();
store.subscribe(() => saveToLocalStorage(store.getState()));

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
