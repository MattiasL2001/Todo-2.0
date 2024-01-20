import React, { useState } from 'react';
import { RegisterUser, GetUsers, LoginUser } from '../services/userServices';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

// Styles
const registerContainerStyle = {
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

export default function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    try {
      // Step 1: Register the user
      const registrationData = await RegisterUser(username, password);

      if (registrationData) {
        setAuthenticated(true);
        console.log("isAuthed: " + isAuthenticated);
        await LoginUser(username, password);
        navigate(`/user/${username}`);
      } else {
        console.log("login failed");
      }
    } catch (error) {
      console.error('Registration or login failed:', error);
    }
  };

  return (
    <div style={registerContainerStyle}>
        <h2>Register Page</h2>
        <br></br>
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />

      <button type="submit" onClick={handleRegisterClick} style={buttonStyle}>
        Register
      </button>
    </div>
  );
}
