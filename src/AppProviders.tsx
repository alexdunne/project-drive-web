import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { AuthProvider } from './context/AuthContext';
import { RelayEnvironment } from './RelayEnvironment';

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
