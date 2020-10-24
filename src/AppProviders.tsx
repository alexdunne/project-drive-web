import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import { AuthProvider } from "./context/AuthContext";
import { RelayEnvironment } from "./RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay/hooks";

export const AppProviders: React.FC = ({ children }) => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ThemeProvider>
        <CSSReset />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};
