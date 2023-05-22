import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducers from "./redux_reducers/product";
import cartReducer from "./redux_reducers/cart";
import ordersReducer from "./redux_reducers/orders";
import allOrdersReducer from "./redux_reducers/allOrders";

const store = configureStore({
  reducer: {
    products: productReducers,
    cart: cartReducer,
    allOrders: allOrdersReducer,
    orders: ordersReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
