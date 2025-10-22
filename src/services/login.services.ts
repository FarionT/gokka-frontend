import { postAPI, putAPI } from './axios';

export const login = (username: string, password: string) => {
  return postAPI("auth/login", { username: username, password: password });
};

export const logoutAPI = (accessToken: string, refreshToken: string) => {
  return postAPI("auth/logout", {
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

export const changePassword = (oldPassword: string, password: string) => {
  return putAPI("auth/change-password", {
    old_password: oldPassword,
    password: password,
  });
};
