import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getUserDetails } from '../services/userServices';
import '../styles/styles.css';

const Header = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const username = sessionStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the username from sessionStorage
    sessionStorage.removeItem('username');
    setAuthenticated(false);
    navigate("/home");
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (username != null && username !== "undefined" && isAuthenticated) {
          // Use getUserDetails to fetch user details based on the stored username
          const userDetails = await getUserDetails(username);
          const updatedUsername = userDetails.username;

          // Update the username in the AuthContext (not strictly necessary at this point)
          // setAuthUsername(updatedUsername); // Remove this line
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUsername();
  }, [username]);

  return (
    <header className="header-style">
      <h1>Todo Website</h1>
      <nav>
        <ul className="ul-style">
          {isAuthenticated && (
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
