import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getUserDetails } from '../services/userServices';

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
    <header style={headerStyle as React.CSSProperties}>
      <h1>Header</h1>
      <nav>
        <ul style={ulStyle as React.CSSProperties}>
          <li style={liStyle as React.CSSProperties}>
            <Link to="/" style={linkStyle as React.CSSProperties}>Home</Link>
          </li>
          {isAuthenticated && (
            <li style={liStyle as React.CSSProperties}>
              {/* Link to dynamic URL with user's username */}
              <Link to={`/user/${username}`} style={linkStyle as React.CSSProperties}>My Page</Link>
            </li>
          )}
          {isAuthenticated ? (
            <>
              <li style={liStyle as React.CSSProperties}>
                {/* Show logout button if authenticated */}
                <button onClick={handleLogout} style={buttonStyle as React.CSSProperties}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li style={liStyle as React.CSSProperties}>
                {/* Show login button if not authenticated */}
                <Link to="/login" style={linkStyle as React.CSSProperties}>Login</Link>
              </li>
              <li style={liStyle as React.CSSProperties}>
                {/* Show register button if not authenticated */}
                <Link to="/register" style={linkStyle as React.CSSProperties}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

// Styles
const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px',
  textAlign: 'center',
};

const ulStyle = {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '0',
};

const liStyle = {
  margin: '0',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
};

export default Header;
