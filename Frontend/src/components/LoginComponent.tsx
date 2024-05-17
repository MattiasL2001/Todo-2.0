import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LoginUser } from '../services/userServices';
import '../styles/styles.css';
import { AxiosError } from 'axios';

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await LoginUser(username, password);

      if (response.status === 200) {
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('username', username);
        setAuthenticated(true);
        navigate(`/user/${username}`);
      } else {
        setErrorMessage('Login failed: Incorrect username or password');
      }
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError;
        console.error('Login failed:', axiosError);
        if (axiosError.response) {
          setErrorMessage('Login failed: ' + axiosError.response.data);
        } else {
          setErrorMessage('Login failed: Please check your network connection');
        }
      } else {
        // Handle non-Axios errors here
        console.error('Non-Axios error:', error);
        setErrorMessage('Login failed: An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container">
      <h2>Login Page</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <br />
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="input-style"
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-style"
      />
      <button onClick={handleLogin} className="button-style">
        Login
      </button>
    </div>
  );
};

export default LoginComponent;
