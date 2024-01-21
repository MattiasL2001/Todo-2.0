import axios, { AxiosError } from 'axios';

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

  export const addUserTodo = async (username: string, completed: boolean, title: string) => {
    try {
      const user = await getUserDetails(username);
  
      if (!user) {
        console.log("error! user not found")
        return null;
      }
  
      const response = await axios.post(`https://localhost:7067/users/${username}/PostTodo`, {
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
        console.log("error! user not found")
        return null;
      }
  
      const response = await axios.put(`https://localhost:7067/users/${username}/PutTodo`, {
        completed: completed,
        title: title,
        id: todoId,
        userId: user.id
      });
  
      return response.data;
    } catch (error) {
      var axiosError = error as AxiosError
      console.log("Error editing a user todo: ", axiosError.response);
      throw error;
    }
  };

  export const removeUserTodo = async (username: string, todoId: number) => {
    try {
      const user = await getUserDetails(username);
  
      if (!user) {
        console.log("error! user not found")
        return null;
      }
  
      const response = await axios.delete(`https://localhost:7067/users/${username}/DeleteTodo/${todoId}`)
  
      return response.data;
    } catch (error) {
      var axiosError = error as AxiosError
      console.log("Error deleting a user todo: ", axiosError.response);
      throw error;
    }
  };