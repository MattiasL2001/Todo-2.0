import React, { useState } from 'react';
import { RegisterUser, GetUsers } from '../services/userServices';

export default function RegisterComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterClick = async () => {
        
        await RegisterUser(username, password)
            .then(data => {
                console.log('Registration successful:', data);
            })
            .catch(error => {
                console.error('Registration failed :(', error.response);
                console.error("user data: " + username + ", " + password)
            });
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
