import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  const decodedToken = jwtDecode<JwtPayload>(token);
  if (!decodedToken.exp) return true;

  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const refreshAuthToken = async (): Promise<string> => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('No token found in localStorage');

    const response = await axios.post('https://localhost:7067/refresh-token', { token });

    const { token: newToken } = response.data;
    localStorage.setItem('jwtToken', newToken);
    return newToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    throw error;
  }
};
