import React, { useState } from 'react';
import { addUserTodo } from '../services/userServices';

interface AddTodoFormProps {
  username?: string; // Make username optional
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
  
    // Reset the input fields
    setNewTodoTitle('');
    setNewTodoCompleted(false);
  };

  return (
    <div>
      <label>Title:</label>
      <input type="text" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} />
      <label>Completed:</label>
      <input type="checkbox" checked={newTodoCompleted} onChange={(e) => setNewTodoCompleted(e.target.checked)} />
      <button onClick={handleSaveTodo}>Post Todo</button>
    </div>
  );
};

export default AddTodoForm;
