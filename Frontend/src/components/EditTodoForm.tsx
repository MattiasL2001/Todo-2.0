import React, { useState } from 'react';
import { editUserTodo } from '../services/userServices';

interface EditTodoFormProps {
  username: string;
  initialPriority: number;
  todoId: number;
  initialTitle: string;
  initialCompleted: boolean;
  onTodoUpdated: (editedTodoPriority: number, editedTodoTitle: string, editedTodoCompleted: boolean) => void;
  onClose: () => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
  username,
  initialPriority,
  todoId,
  initialTitle,
  initialCompleted,
  onTodoUpdated,
  onClose,
}) => {
  const [editedPriority, setEditedPriority] = useState(initialPriority);
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedCompleted, setEditedCompleted] = useState(initialCompleted);
  const [errorText, setErrorText] = useState('');

  const handleUpdateTodo = async () => {
    try {
      if (editedPriority < 1 || editedPriority > 3) {
        setErrorText('Priority must be between 1 and 3');
        return;
      }

      await editUserTodo(username, editedPriority, todoId, editedCompleted, editedTitle);
      onTodoUpdated(editedPriority, editedTitle, editedCompleted);
      onClose();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="edit-todo-overlay">
      <div className="edit-todo-message">
        <h3>Edit Todo</h3>
        {errorText && <p style={{ color: 'red', marginBottom: '10px' }}>{errorText}</p>}
        <label>Priority:</label>
        <input
          type="number"
          value={editedPriority}
          onChange={(e) => {
            setEditedPriority(e.target.valueAsNumber);
            setErrorText('');
          }}
        />
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
        <div className='edit-todo-div'></div>
        <button onClick={handleUpdateTodo} className='button-style-small'>Update Todo</button>
        <div className='edit-todo-div'></div>
        <button onClick={onClose} className='button-style-small'>Cancel</button>
      </div>
    </div>
  );
};

export default EditTodoForm;
