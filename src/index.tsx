import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AppProviders } from "./AppProviders";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.unstable_createRoot(root).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
