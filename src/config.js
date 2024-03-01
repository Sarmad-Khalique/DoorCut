import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

BASE_URL = 'https://api.doorcutapp.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
