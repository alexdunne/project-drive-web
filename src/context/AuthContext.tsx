import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FullPageSpinner } from '../components/FullPageSpinner';
import { useAsync } from '../hooks/useAsync';
import { AuthUtils } from '../util/auth';

interface User {
  id: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface State {
  user: User | null;
  isAuthenticated: boolean;
  login: (values: LoginValues) => void;
  logout: () => void;
}

// As GraphQL is used everywhere but the authentication routes we'll leave this
// as a basic inlined implementation for now
const authClient = {
  login: async (values: LoginValues) => {
    const response = await window.fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    return response.json();
  },
  refresh: async (token: string) => {
    const response = await window.fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: token }),
    });

    return response.json();
  },
};

const AuthContext = React.createContext<State | undefined>(undefined);

const refreshAuth = async () => {
  const refreshToken = AuthUtils.getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const result = await authClient.refresh(refreshToken);

  if (result.errors) {
    throw new Error('Failed to acquire a new token');
  }

  return result;
};

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  const onRefreshAuth = useCallback(async () => {
    try {
      const result = await refreshAuth();

      AuthUtils.setAuthToken(result.token);
      setUser(result.user);
    } catch (e) {
      AuthUtils.logout();
      setUser(null);
    }
  }, []);

  const { execute, status } = useAsync(onRefreshAuth);

  useEffect(() => {
    execute();
  }, [execute]);

  const login = useCallback(async (values: LoginValues) => {
    const result = await authClient.login(values);

    AuthUtils.setAuthToken(result.token);
    AuthUtils.setRefreshToken(result.refresh_token);
    setUser(result.user);
  }, []);

  const logout = useCallback(() => {
    AuthUtils.logout();
    setUser(null);
  }, [setUser]);

  const isAuthenticated = useMemo(() => {
    return user != null;
  }, [user]);

  const contextValue = useMemo(() => {
    return { user, isAuthenticated, login, logout };
  }, [login, logout, user, isAuthenticated]);

  if (status === 'idle' || status === 'pending') {
    return <FullPageSpinner />;
  }

  if (status === 'error') {
    // This should be handled in the function that tries to refetch the user
    return null;
  }

  if (status === 'success') {
    return <AuthContext.Provider value={contextValue} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
