import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles/styles.css';

const Header = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    setAuthenticated(false);
    navigate("/home");
  };

  return (
    <header className="header-style">
      <h1>Todo Website</h1>
      <nav>
        <ul className="ul-style">
          {isAuthenticated && username && (
            <li className="li-style">
              {/* Link to dynamic URL with user's username */}
              <Link to={`/user/${username}`} className="link-style">My Page</Link>
            </li>
          )}
          {isAuthenticated ? (
            <>
              <li className="li-style">
                {/* Show logout button if authenticated */}
                <button onClick={handleLogout} className="button-style-header">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="li-style">
                {/* Show login button if not authenticated */}
                <Link to="/login" className="link-style">Login</Link>
              </li>
              <li className="li-style">
                {/* Show register button if not authenticated */}
                <Link to="/register" className="link-style">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
