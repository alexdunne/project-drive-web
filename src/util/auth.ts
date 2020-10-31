const AUTH_TOKEN_STORAGE_KEY = 'project_drive:auth:token';
const REFRESH_TOKEN_STORAGE_KEY = 'project_drive:auth:refresh_token';

export const AuthUtils = {
  getAuthToken: () => {
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  },
  setAuthToken: (token: string) => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  },
  getRefreshToken: () => {
    return window.localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  },
  setRefreshToken: (token: string) => {
    window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
  },
  logout: () => {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  },
};
