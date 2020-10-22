import React, { useCallback, useMemo, useState } from "react";

import { AuthUtils } from "../util/auth";
const { graphql, useMutation } = require("react-relay/hooks");

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const [loginCommit] = useMutation(graphql`
    mutation AuthContext_LoginMutation($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          id
        }
      }
    }
  `);

  const [registerCommit] = useMutation(graphql`
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
          const { token, user } = data;

          AuthUtils.setAuthToken(token);

          setUser(user);
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
          const { token, user } = data;

          AuthUtils.setAuthToken(token);

          setUser(user);
        },
      });
    },
    [registerCommit, setUser]
  );

  const logout = useCallback(() => {
    AuthUtils.logout();
    setUser(null);
  }, [setUser]);

  const isAuthenticated = useCallback(() => {
    return user !== null;
  }, [user]);

  const value = useMemo(() => {
    return { user, isAuthenticated, login, logout, register };
  }, [login, logout, register, user, isAuthenticated]);

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
