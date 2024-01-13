import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7067/api/Authenticate/login', {
        username: username,
        password: password
      });

      if (response.status === 200) {
        console.log("logged in");
        setAuthenticated(true);
      } else {
        console.log("error: " + response);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/user/${username}`);
    }
  }, [isAuthenticated, navigate, username]);

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
