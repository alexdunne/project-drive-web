const AUTH_TOKEN_STORAGE_KEY = "project_drive:auth:token";

export const AuthUtils = {
  getAuthToken: () => {
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  },
  setAuthToken: (token) => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  },
  logout: () => {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  },
};
