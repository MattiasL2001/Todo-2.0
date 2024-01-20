import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LoginUser } from '../services/userServices';

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await LoginUser(username, password);

      if (response.status === 200 && username !== "undefined") {
        console.log("logged in");

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
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
