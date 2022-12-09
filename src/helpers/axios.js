/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import axios from 'axios';
import deviceStorage from './deviceStorage';
import { setCurrentUser } from './Utils';

// eslint-disable-next-line import/prefer-default-export
export const API = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER,
  timeout: 30000,
});

API.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${deviceStorage.loadJWT()}`;

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (err) => {
    const originalReq = err.config;
    const refreshToken = deviceStorage.loadKey('refresh-auth-token');
    if (err.response?.status === 420) {
      setCurrentUser();
      window.location.reload();
    }

    if (
      refreshToken &&
      !originalReq._retry &&
      err.response?.data === 'Unauthorized' &&
      err.response.status === 401
    ) {
      originalReq._retry = true;

      return API.post(`/api/auth/refreshtoken`, { refreshToken }).then(
        (res) => {
          if (res.status === 200) {
            deviceStorage.saveJWT(res.data);

            originalReq.headers.authorization = `Bearer ${res.data.token}`;
            return API(originalReq);
          }

          return false;
        }
      );
    }
    return Promise.reject(err);
  }
);
