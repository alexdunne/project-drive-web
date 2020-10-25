import React, { useCallback, useMemo, useState } from 'react';
import { graphql, useMutation } from 'react-relay/hooks';

import { AuthContext_LoginMutation } from '../__generated__/AuthContext_LoginMutation.graphql';
import { AuthContext_RegisterMutation } from '../__generated__/AuthContext_RegisterMutation.graphql';
import { RuntimeError } from '../error/BaseErrors';
import { AuthUtils } from '../util/auth';

interface User {
  id: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

interface State {
  user: User | null;
  isAuthenticated: boolean;
  register: (values: RegisterValues) => void;
  login: (values: LoginValues) => void;
  logout: () => void;
}

const AuthContext = React.createContext<State | undefined>(undefined);

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  const [loginCommit] = useMutation<AuthContext_LoginMutation>(graphql`
    mutation AuthContext_LoginMutation($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          id
        }
      }
    }
  `);

  const [registerCommit] = useMutation<AuthContext_RegisterMutation>(graphql`
    mutation AuthContext_RegisterMutation($input: RegisterInput!) {
      register(input: $input) {
        token
        user {
          id
        }
      }
    }
  `);

  const login = useCallback(
    (values) => {
      loginCommit({
        variables: { input: values },
        onCompleted(data) {
          if (!data.login?.user) {
            throw new RuntimeError(
              'Something went wrong when attempting to log in',
              'No user was returned from the query'
            );
          }

          AuthUtils.setAuthToken(data.login.token);

          setUser(data.login.user);
        },
        onError(e) {
          alert(e);
        },
      });
    },
    [loginCommit, setUser]
  );

  const register = useCallback(
    (values) => {
      registerCommit({
        variables: values,
        onCompleted(data) {
          if (!data.register?.user) {
            throw new RuntimeError(
              'Something went wrong when attempting to log in',
              'No user was returned from the query'
            );
          }

          AuthUtils.setAuthToken(data.register.token);

          setUser(data.register.user);
        },
      });
    },
    [registerCommit, setUser]
  );

  const logout = useCallback(() => {
    AuthUtils.logout();
    setUser(null);
  }, [setUser]);

  const isAuthenticated = useMemo(() => {
    return user !== null;
  }, [user]);

  const value = useMemo(() => {
    return { user, isAuthenticated, register, login, logout };
  }, [login, logout, register, user, isAuthenticated]);

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
