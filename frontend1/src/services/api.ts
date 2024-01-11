import axios from 'axios';
import { failedRequestQueue, processQueue } from '../utils';

let isRefreshing = false;

function axiosClient() {
  const baseURL = 'http://localhost:3000'

  const axiosClient = axios.create({
    baseURL,
    withCredentials: true
  });

  axiosClient.interceptors.response.use(
    response => response,
    async error => {
      const loginEndpoint = '/login';

      const originalRequest = error.config;
      
      const meetsRefreshCriteria = error.response.status === 401 && error.config.url !== loginEndpoint && !originalRequest._retry 

      if (isRefreshing && meetsRefreshCriteria) {
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch(err => {
              signOut();
              return Promise.reject(err);
            });
      }

      if(!isRefreshing && meetsRefreshCriteria) {
        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          axiosClient
            .post(`/refresh_token`)
            .then(({ data }) => {
              axiosClient.defaults.headers.common['authorization'] =
                `Bearer ${data.access_token}`;

              axios.defaults.headers.common['Authorization'] =
                `Bearer ${data.access_token}`;

              originalRequest.headers['Authorization'] =
                `Bearer ${data.access_token}`;

              processQueue(null, data.access_token);
              resolve(axios(originalRequest));
            })
            .catch(err => {
              processQueue(err, null);
              reject(err);
              signOut();
            })
            .finally(() => isRefreshing = false);
        });
      }

      return Promise.reject(error);
    },
  );

  return axiosClient;
}

function signOut() {
  localStorage.clear();
  window.location.href = '/login';
}

export const api = axiosClient();
