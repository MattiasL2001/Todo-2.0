import axios from 'axios';

export const RegisterUser = async (username: string, password: string) => {
    const response = await axios.post("https://localhost:7067/users/AddUser", {
        username: username,
        password: password
      });
  
      console.log('User added:', response.data);
      return response.data;
  };
  

export const GetUsers = async () => {
    const response = await axios.get("https://localhost:7067/usersGetUsers");
    console.log(response.data)
    return response.data;
};