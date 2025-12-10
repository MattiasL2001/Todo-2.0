import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../AuthContext';

// Styles
const homeContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
};

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const username = localStorage.getItem('username');

  return (
    <>
      <Header />
      <div style={homeContainerStyle}>
        <h1>Home Page</h1>
        <br />
        <br />
        {isAuthenticated ? (
          <>
            <h2>Welcome back {username}! Here you can manage your todos.</h2>
            <h2>Go to your user page to view and manage all your todos.</h2>
          </>
        ) : (
          <>
            <h2>Here you can post your todos, so you'll never forget what to do ;)</h2>
            <h2>Click on Login to view all your todos, or click Register to create an account.</h2>
            <h2 style={{ color: "red" }}>WARNING! This application is for educational purposes. Do not register with sensitive data/information.</h2>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
