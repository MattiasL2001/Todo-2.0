import React, { useState } from 'react';
import EditTodoForm from './EditTodoForm';

interface TodoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  username?: string;
  onRemoveTodo: (todoId: number) => void;
  onEditTodoSubmit: (editedTodoTitle: string, editedTodoCompleted: boolean) => void;
  onTodoUpdated: () => void; // Ensure the correct name is used here
}

const TodoComponent: React.FC<TodoProps> = ({ todo, username, onRemoveTodo, onEditTodoSubmit, onTodoUpdated }) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleEditToggle = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  const handleEditSubmit = async (editedTodoTitle: string, editedTodoCompleted: boolean) => {
    onEditTodoSubmit(editedTodoTitle, editedTodoCompleted);
    setEditing(false);
    onTodoUpdated()
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: (hovered || editing) ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
    >
      <p>Title: {todo.title}</p>
      <p>Id: {todo.id}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>

      {(hovered || editing) && (
        <div>
          <button onClick={handleEditToggle}>Edit ✏️</button>
          <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
        </div>
      )}

      {/* Render EditTodoForm only for the selected todo */}
      {editing && username && (
        <EditTodoForm
          username={username}
          todoId={todo.id}
          initialTitle={todo.title}
          initialCompleted={todo.completed}
          onTodoUpdated={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default TodoComponent;
