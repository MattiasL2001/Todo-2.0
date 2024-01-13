// User.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../services/userServices';

interface UserDetails {
  username: string;
  // Add other properties based on your API response
}

const User: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    console.log("username: " + username)
    const fetchUserDetails = async () => {
      if (username) {
        try {
          const userData = await getUserDetails(username);
          console.log("user details: " + userData)
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {username}</p>
      {/* Add other user details here based on your API response */}
    </div>
  );
};

export default User;
