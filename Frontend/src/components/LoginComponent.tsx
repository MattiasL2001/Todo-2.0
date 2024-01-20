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
    <div style={loginContainerStyle as React.CSSProperties}>
        <h2>Login Page</h2>
        <br></br>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={inputStyle as React.CSSProperties}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={inputStyle as React.CSSProperties}
      />
      <button onClick={handleLogin} style={buttonStyle as React.CSSProperties}>
        Login
      </button>
    </div>
  );
};

// Styles
const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
  // color: '#fff',
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
};

const buttonStyle = {
  background: '#4CAF50',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LoginComponent;
