import axios from 'axios';

function axiosClient() {
  const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
  });

  return axiosClient;
}

export const api = axiosClient();
