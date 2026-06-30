import api from './api';
import { handleApiError } from './errorHandler';

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('mock_user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const registerUser = async (name, username, password) => {
  try {
    const response = await api.post('/register', { name, username, password });
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('mock_user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.warn("Logout error:", handleApiError(error));
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('mock_user');
  }
};
