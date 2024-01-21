import React, { useState, useEffect } from 'react';
import { editUserTodo } from '../services/userServices'; // Make sure you have the appropriate service function

interface EditTodoFormProps {
  username: string;
  todoId: number;
  initialTitle: string;
  initialCompleted: boolean;
  onTodoUpdated: (editedTodoTitle: string, editedTodoCompleted: boolean) => void; // Updated prop signature
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ username, todoId, initialTitle, initialCompleted, onTodoUpdated }) => {
  const [editedTodoTitle, setEditedTodoTitle] = useState<string>(initialTitle);
  const [editedTodoCompleted, setEditedTodoCompleted] = useState<boolean>(initialCompleted);

  useEffect(() => {
    // Set initial values when the component mounts
    setEditedTodoTitle(initialTitle);
    setEditedTodoCompleted(initialCompleted);
  }, [initialTitle, initialCompleted]);

  const handleUpdateTodo = async () => {
    try {
      // Call the editUserTodo service function with the updated values
      console.log("todo id: " + todoId)
      await editUserTodo(username, todoId, editedTodoCompleted, editedTodoTitle);
      onTodoUpdated(editedTodoTitle, editedTodoCompleted); // Pass the updated values to the parent component
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <label>Title:</label>
      <input type="text" value={editedTodoTitle} onChange={(e) => setEditedTodoTitle(e.target.value)} />
      <label>Completed:</label>
      <input
        type="checkbox"
        checked={editedTodoCompleted}
        onChange={(e) => setEditedTodoCompleted(e.target.checked)}
      />
      <button onClick={handleUpdateTodo}>Update Todo</button>
    </div>
  );
};

export default EditTodoForm;
