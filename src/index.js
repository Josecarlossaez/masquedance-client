import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@madzadev/audio-player/dist/index.css";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// Calendar to admin

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
    <BrowserRouter>
      <AuthWrapper>
          <App />
      </AuthWrapper>
    </BrowserRouter>
  </PayPalScriptProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
