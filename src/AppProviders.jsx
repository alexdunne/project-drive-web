import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import { AuthProvider } from "./context/AuthContext";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
