import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bulma/css/bulma.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <App />

);

reportWebVitals();
  {/*<React.StrictMode>
    <App />
</React.StrictMode>*/}