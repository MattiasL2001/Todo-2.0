import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import User from './views/User';
import NoPage from './views/NoPage';
import { AuthProvider } from './AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* Include setAuthenticated prop in Login route to update state in the AuthContext */}
            <Route path="/register" element={<Register />} />
            <Route path="/nopage" element={<NoPage />} />

            <Route path="/user/:username" element={<User />} />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Add a catch-all route at the end, if needed */}
            {/* <Route path="*" element={<Navigate to="/nopage" />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

// Component for unauthorized access
const UnauthorizedPage: React.FC = () => {
  return <div>Unauthorized access! Please log in to view this page.</div>;
};

export default App;
