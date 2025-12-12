import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import User from './views/User';
import NoPage from './views/NoPage';
import { AuthProvider } from './AuthContext';
import './styles/App.css';

const UnauthorizedPage: React.FC = () => {
  return <div>Unauthorized access! Please log in to view this page.</div>;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </HashRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
