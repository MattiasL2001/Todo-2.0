import React, { useState } from 'react';
import { RegisterUser, GetUsers, LoginUser } from '../services/userServices';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleRegisterClick = async () => {
        
        try {
            // Step 1: Register the user
            const registrationData = await RegisterUser(username, password);

            if (registrationData)
            {
                setAuthenticated(true)
                console.log("isAuthed: " + isAuthenticated)
                await LoginUser(username, password);
                navigate(`/user/${username}`);
            }
            else (console.log("login failed"))
            
        } catch (error) {
            console.error('Registration or login failed:', error);
        }
    };

    return (
        <div>
            {/* Your registration form */}
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" onClick={handleRegisterClick}>
                Register
            </button>
            <button type="submit" onClick={GetUsers}>
                Get Users
            </button>
        </div>
    );
}
