import React, { useState } from 'react';
import { RegisterUser, LoginUser } from '../services/userServices';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { AxiosError } from 'axios';

const RegisterComponent: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    try {
      const registrationData = await RegisterUser(username, password);

      if (registrationData) {
        const loginResponse = await LoginUser(username, password);

        if (loginResponse.status === 200) {
          localStorage.setItem('jwtToken', loginResponse.data.token);
          localStorage.setItem('username', username);
          setAuthenticated(true);
          navigate(`/user/${username}`);
        } else {
          setErrorMessage('Login failed after registration');
        }
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error: any) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        console.error('Registration failed:', axiosError);
        setErrorMessage('Registration failed: ' + error.response.data);
      } else {
        console.error('Non-Axios error:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Register Page</h2>
      <br />
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Error message div */}
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-style"
        placeholder="Username"
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-style"
        placeholder="Password"
      />

      <button type="submit" onClick={handleRegisterClick} className="button-style">
        Register
      </button>
    </div>
  );
};

export default RegisterComponent;
