import React, { useState } from 'react';
import { RegisterUser, LoginUser } from '../services/userServices';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const RegisterComponent: React.FC = () => {
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
    <div className="container">
      <h2>Register Page</h2>
      <br />
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-style" />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-style" />

      <button type="submit" onClick={handleRegisterClick} className="button-style">
        Register
      </button>
    </div>
  );
};

export default RegisterComponent;
