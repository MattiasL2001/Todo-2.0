import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../services/userServices';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';

interface UserDetails {
  username: string;
  // Add other properties based on your API response
}

const User: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (isAuthenticated && username) {
        try {
          const userData = await getUserDetails(username);
          setUserDetails(userData);
        } catch (error) {
          // Handle the error if needed
        }
      }
    };

    // Make sure to call the fetchUserDetails function when the component mounts
    fetchUserDetails();
  }, [username]); // Run the effect whenever the username changes

  if (!userDetails) {
    return (
      <>
        <Header></Header>
        <div>You must login in order to view this page.</div>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <h2>User Details</h2>
      <p>Username: {username}</p>
      {/* Add other user details here based on your API response */}
    </>
  );
};

export default User;
