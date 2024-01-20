import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails, getUserTodos } from '../services/userServices';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styles
const userContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  overflowY: 'auto',  // Enable vertical scrolling when content overflows
};

interface UserDetails {
  // Add all the properties based on your API response
  username: string;
  email: string;
  // Add other properties based on your API response
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const User: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userTodos, setUserTodos] = useState<Todo[]>([]); // Update the type to match your actual todo structure
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && username) {
        try {
          const userData = await getUserDetails(username);
          setUserDetails(userData);

          // Fetch user todos
          const todos = await getUserTodos(username);
          setUserTodos(todos);
        } catch (error) {
          // Handle the error if needed
        }
      }
    };

    // Make sure to call the fetchData function when the component mounts
    fetchData();
  }, [isAuthenticated, username]); // Run the effect whenever isAuthenticated or username changes

  if (!userDetails) {
    return (
      <>
        <Header></Header>
        <div>You must log in to view this page.</div>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <div style={userContainerStyle}>
        <h2>User Details</h2>
        {/* Display all the user details */}
        {Object.entries(userDetails).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}

        <h2>User Todos</h2>
        {/* Display user todos */}
        <ul>
          {userTodos.map((todo) => (
            <li key={todo.id}>
              <p>Title: {todo.title}</p>
              <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
};

export default User;
