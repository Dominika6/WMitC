import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import { reducers } from "./reducers";
import { Api } from "./api";
import { DataLoaderGuard } from "./DataLoderGuard";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

(async function () {
  const api = Api.getInstance();
  await api.init();
})();

ReactDOM.render(
  <Provider store={store}>
    <DataLoaderGuard>
      <App />
    </DataLoaderGuard>
  </Provider>,
  document.getElementById("root")
);
