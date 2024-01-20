import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getUserDetails } from '../services/userServices';

const Header = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const username = sessionStorage.getItem('username');

  const handleLogout = () => {
    // Clear the username from sessionStorage
    sessionStorage.removeItem('username');
    setAuthenticated(false);
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (username != null && username !== "undefined") {
          // Use getUserDetails to fetch user details based on the stored username
          const userDetails = await getUserDetails(username);
          const updatedUsername = userDetails.username;

          // Update the username in the AuthContext (not strictly necessary at this point)
          // setAuthUsername(updatedUsername); // Remove this line

          console.log("Updated Username:", updatedUsername);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUsername();
  }, [username]);

  return (
    <header>
      <h1>Header</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              {/* Link to dynamic URL with user's username */}
              <Link to={`/user/${username}`}>My Page</Link>
            </li>
          )}
          {isAuthenticated ? (
            <li>
              {/* Show logout button if authenticated */}
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              {/* Show login button if not authenticated */}
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
