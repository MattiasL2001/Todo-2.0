import axios from 'axios';

export const RegisterUser = async (username: string, password: string) => {
    const response = await axios.post("https://localhost:7067/users/AddUser", {
        username: username,
        password: password
      });
      return response.data;
  };
  
export const GetUsers = async () => {
    const response = await axios.get("https://localhost:7067/usersGetUsers");
    return response.data;
};

export const getUserDetails = async (username: string) => {
    try {
      const response = await axios.get(`https://localhost:7067/user/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };