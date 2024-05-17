import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails, getUserTodos, editUserTodo, addUserTodo, removeUserTodo } from '../services/userServices';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddTodoForm from '../components/AddTodoForm';
import TodoComponent from '../components/TodoComponent';
import '../styles/styles.css';

interface Todo {
  priority: number,
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const User: React.FC = () => {
  const { username } = useParams<{ username: string }>();
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
          
        }
      }
    };

    fetchData();
  }, [isAuthenticated, username, setAddingTodo, editingTodoId]);

  const handleTodoAdded = async () => {
    if (username) {
      try {
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

  const handleEditTodoSubmit = async (editedTodoPriority: number, editedTodoTitle: string, editedTodoCompleted: boolean) => {
    if (username) {
      try {
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
      <div className="user-container">
        {isAuthenticated ? (
          <>
            <button className="button-style add-todo-button" onClick={handleAddTodo}>Add Todo</button>
            {addingTodo && (
              <AddTodoForm
                username={username}
                onTodoAdded={handleTodoAdded}
              />
            )}
            <br />
            <br />
            <div className="todo-grid">
              {userTodos.map((todo) => (
                <TodoComponent
                  key={todo.id}
                  todo={todo}
                  username={username}
                  onEditTodoSubmit={handleEditTodoSubmit}
                  onRemoveTodo={handleRemoveTodo}
                />
              ))}
            </div>
          </>
        ) : (
          <div>Please log in to view todos.</div>
        )}
      </div>
      <Footer />
    </>
  );  
};

export default User;
