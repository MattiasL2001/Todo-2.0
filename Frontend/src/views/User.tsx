import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails, getUserTodos, editUserTodo, addUserTodo, removeUserTodo } from '../services/userServices';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddTodoForm from '../components/AddTodoForm';
import TodoComponent from '../components/TodoComponent';

// Styles
const userContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  width: "80%",
  margin: '0 auto', // Center the content
  overflowY: 'auto',
};

const todoGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Adjust the minmax values as needed
  gap: '16px',
  width: '100%',
};

const todoBoxStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
};

interface UserDetails {
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const User: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  // const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [addingTodo, setAddingTodo] = useState<boolean>(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && username) {
        try {
          const userData = await getUserDetails(username);

          if (userData) {
            const todos = await getUserTodos(username);
            setUserTodos(todos);
          }
        } catch (error) {
          // Handle the error if needed
        }
      }
    };

    fetchData();
  }, [isAuthenticated, username, setAddingTodo, editingTodoId]);

  const handleTodoAdded = async () => {
    if (username) {
      try {
        // Add the new todo and fetch the updated todos
        await addUserTodo(username, false, "New Todo Title");
        const updatedTodos = await getUserTodos(username);
        setUserTodos(updatedTodos);
      } catch (error) {
        console.error('Error fetching updated todos:', error);
      }
      setAddingTodo(false);
    }
  };

  const handleAddTodo = () => {
    setAddingTodo((prevState) => !prevState);
    setEditingTodoId(null);
  };

  const handleEditTodoSubmit = async (editedTodoTitle: string, editedTodoCompleted: boolean) => {
    if (username && editingTodoId !== null) {
      try {
        await editUserTodo(username, editingTodoId, editedTodoCompleted, editedTodoTitle);
        const updatedTodos = await getUserTodos(username);
        setUserTodos(updatedTodos);
        setEditingTodoId(null);
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  const handleRemoveTodo = async (todoId: number) => {
    if (username)
    {
      try {
        await removeUserTodo(username, todoId);
        const updatedTodos = await getUserTodos(username);
        setUserTodos(updatedTodos);
      } catch (error) {
        console.error('Error removing todo:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <div style={userContainerStyle}>
        {isAuthenticated && (
          <button onClick={handleAddTodo}>Add Todo</button>
        )}

        {addingTodo && (
          <AddTodoForm
            username={username}
            onTodoAdded={handleTodoAdded}
          />
        )}

        <br />
        <br />

        <div style={todoGridStyle}>
          {userTodos.map((todo) => (
            <TodoComponent
              key={todo.id}
              todo={todo}
              username={username}
              onEditTodoSubmit={handleEditTodoSubmit}
              onRemoveTodo={handleRemoveTodo}
              onTodoUpdated={handleTodoAdded}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
