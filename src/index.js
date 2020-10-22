import React from "react";
import ReactDOM from "react-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import App from "./App";
import { AppProviders } from "./AppProviders";
import { RelayEnvironment } from "./RelayEnvironment";

import "./styles/tailwind.css";

ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AppProviders>
        <App />
      </AppProviders>
    </RelayEnvironmentProvider>
  </React.StrictMode>
);
