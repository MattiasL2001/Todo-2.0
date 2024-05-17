import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { isTokenExpired, refreshAuthToken } from '../utils';

const api = axios.create({
  baseURL: 'https://localhost:7067',
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem('jwtToken');

    if (token && isTokenExpired(token)) {
      try {
        token = await refreshAuthToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
        // Handle token refresh failure, such as logging out the user or redirecting to the login page
        throw error; // Throw the error to prevent the request from proceeding
      }
    }

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const RegisterUser = async (username: string, password: string) => {
  const response = await api.post("/register", {
    username: username,
    password: password
  });
  return response.data;
};

export const LoginUser = async (username: string, password: string) => {
  const response = await api.post('/login', {
    username: username,
    password: password
  });
  return response;
};

export const GetUsers = async () => {
  const response = await api.get("/users/GetUsers");
  return response.data;
};

export const getUserDetails = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getUserTodos = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}/GetTodos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const addUserTodo = async (username: string, completed: boolean, title: string) => {
  try {
    const user = await getUserDetails(username);

    if (!user) {
      console.log("error! user not found");
      return null;
    }

    const response = await api.post(`/users/${username}/PostTodo`, {
      completed: completed,
      title: title,
      userId: user.id
    });

    return response.data;
  } catch (error) {
    console.log("Error posting a user todo: ", error);
    throw error;
  }
};

export const editUserTodo = async (username: string, todoId: number, completed: boolean, title: string) => {
  try {
    const user = await getUserDetails(username);

    if (!user) {
      console.log("error! user not found");
      return null;
    }

    const response = await api.put(`/users/${username}/PutTodo`, {
      completed: completed,
      title: title,
      id: todoId,
      userId: user.id
    });

    return response.data;
  } catch (error) {
    var axiosError = error as AxiosError;
    console.log("Error editing a user todo: ", axiosError.response);
    throw error;
  }
};

export const removeUserTodo = async (username: string, todoId: number) => {
  try {
    const user = await getUserDetails(username);

    if (!user) {
      console.log("error! user not found");
      return null;
    }

    const response = await api.delete(`/users/${username}/DeleteTodo/${todoId}`);

    return response.data;
  } catch (error) {
    var axiosError = error as AxiosError;
    console.log("Error deleting a user todo: ", axiosError.response);
    throw error;
  }
};
