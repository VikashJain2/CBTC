import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import EventContextProvider from "./context/eventContext.jsx";
import  TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <EventContextProvider>
      <App />
    </EventContextProvider>
  </BrowserRouter>
);
