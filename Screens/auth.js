// auth.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'http://127.0.0.1:8000/api/';

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register/`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error.response ? error.response.data : { message: 'Network error' };
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, { username, password });
    const { access, refresh } = response.data;
    await AsyncStorage.setItem('access_token', access);
    await AsyncStorage.setItem('refresh_token', refresh);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('refresh_token');
};
