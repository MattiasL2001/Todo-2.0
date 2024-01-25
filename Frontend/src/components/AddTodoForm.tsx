import React, { useState } from 'react';
import { addUserTodo } from '../services/userServices';
import '../styles/styles.css';

interface AddTodoFormProps {
  username?: string;
  onTodoAdded: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ username = '', onTodoAdded }) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false);

  const handleSaveTodo = async () => {
    try {
      if (username) {
        await addUserTodo(username, newTodoCompleted, newTodoTitle);
        onTodoAdded();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }

    setNewTodoTitle('');
    setNewTodoCompleted(false);
  };

  return (
    <div className="add-todo-form">
      <label>Title:</label>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        className="input-style"
      />
      <label>Completed:</label>
      <input
        type="checkbox"
        checked={newTodoCompleted}
        onChange={(e) => setNewTodoCompleted(e.target.checked)}
      />
      <button onClick={handleSaveTodo} className="button-style add-todo-button">
        Post Todo
      </button>
    </div>
  );
};

export default AddTodoForm;
