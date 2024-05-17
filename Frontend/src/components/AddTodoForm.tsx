import React, { useState } from 'react';
import { addUserTodo } from '../services/userServices';
import '../styles/styles.css';

interface AddTodoFormProps {
  username?: string;
  onTodoAdded: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ username = '', onTodoAdded }) => {
  const [newTodoPriority, setNewTodoPriority] = useState<number | undefined>();
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false);

  const handleSaveTodo = async () => {
    try {
      if (username && newTodoPriority !== undefined) {
        
        if (newTodoPriority < 1 || newTodoPriority > 3) {
          throw new Error('Priority must be between 1 and 3');
        }

        await addUserTodo(username, newTodoPriority, newTodoCompleted, newTodoTitle);
        onTodoAdded();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      alert(error);
    }

    setNewTodoTitle('');
    setNewTodoCompleted(false);
  };

  return (
    <div className="add-todo-form">
      <label>Priority:</label>
      <input
        type="number"
        value={newTodoPriority || ''}
        onChange={(e) => setNewTodoPriority(e.target.valueAsNumber)}
        className="input-style"
      />
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
