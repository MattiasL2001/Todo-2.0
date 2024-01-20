import axios from 'axios';

export const RegisterUser = async (username: string, password: string) => {
    const response = await axios.post("https://localhost:7067/register", {
        username: username,
        password: password
      });
      return response.data;
  };

  export const LoginUser = async (username: string, password: string) => {
    const response = await axios.post('https://localhost:7067/login', {
      username: username,
      password: password
      });
      return response;
  };
  
export const GetUsers = async () => {
    const response = await axios.get("https://localhost:7067/users/GetUsers");
    return response.data;
};

export const getUserDetails = async (username: string) => {
    try {
      const response = await axios.get(`https://localhost:7067/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };

  export const getUserTodos = async (username: string) => {
    try {
      const response = await axios.get(`https://localhost:7067/users/${username}/GetTodos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };