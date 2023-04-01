import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "antd/dist/reset.css";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
);
