// LoginComponent.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LoginUser } from '../services/userServices';
import '../styles/styles.css';

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await LoginUser(username, password);

      if (response.status === 200 && username !== "undefined") {
        setAuthenticated(true);
        sessionStorage.setItem('username', username);

        navigate(`/user/${username}`);
      } else {
        console.log("error: " + response.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login Page</h2>
      <br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="input-style"
      />
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
