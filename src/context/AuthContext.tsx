import React, { useCallback, useMemo, useState } from 'react';

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
};

const AuthContext = React.createContext<State | undefined>(undefined);

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (values: LoginValues) => {
    const result = await authClient.login(values);

    AuthUtils.setAuthToken(result.token);
    setUser(result.user);
  }, []);

  const logout = useCallback(() => {
    AuthUtils.logout();
    setUser(null);
  }, [setUser]);

  const isAuthenticated = useMemo(() => {
    return user !== null;
  }, [user]);

  const value = useMemo(() => {
    return { user, isAuthenticated, login, logout };
  }, [login, logout, user, isAuthenticated]);

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
