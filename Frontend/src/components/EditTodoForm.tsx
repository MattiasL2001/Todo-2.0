import React, { useState } from 'react';
import { editUserTodo } from '../services/userServices';

interface EditTodoFormProps {
  username: string;
  todoId: number;
  initialTitle: string;
  initialCompleted: boolean;
  onTodoUpdated: (editedTodoTitle: string, editedTodoCompleted: boolean) => void;
  onClose: () => void; // Add a function to close the form
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
  username,
  todoId,
  initialTitle,
  initialCompleted,
  onTodoUpdated,
  onClose,
}) => {
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedCompleted, setEditedCompleted] = useState(initialCompleted);

  const handleUpdateClick = () => {
    // Call the onTodoUpdated function with the edited values
    onTodoUpdated(editedTitle, editedCompleted);

    // Close the form
    onClose();
  };

  const handleUpdateTodo = async () => {
    try {
      // Call the editUserTodo service function with the updated values
      await editUserTodo(username, todoId, editedCompleted, editedTitle);
      onTodoUpdated(editedTitle, editedCompleted); // Pass the updated values to the parent component
      onClose()
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="edit-todo-overlay">
      <div className="edit-todo-message">
        <h3>Edit Todo</h3>
        <label>Title:</label>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <label>Completed:</label>
        <input
          type="checkbox"
          checked={editedCompleted}
          onChange={() => setEditedCompleted(!editedCompleted)}
        />
        <button onClick={handleUpdateTodo}>Update Todo</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTodoForm;
