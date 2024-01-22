import React, { useState } from 'react';
import EditTodoForm from './EditTodoForm';
import '../styles/styles.css';

interface TodoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  username?: string;
  onRemoveTodo: (todoId: number) => void;
  onEditTodoSubmit: (editedTodoTitle: string, editedTodoCompleted: boolean, ) => void;
}

const TodoComponent: React.FC<TodoProps> = ({ todo, username, onRemoveTodo, onEditTodoSubmit }) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleEditToggle = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  const handleEditSubmit = async (editedTodoTitle: string, editedTodoCompleted: boolean) => {
    onEditTodoSubmit(editedTodoTitle, editedTodoCompleted);
    setEditing(false);
  };

  return (
    <div
      className={`todo-container ${hovered || editing ? 'editing' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>

      {(hovered || editing) && (
        <div className='todo-button-container'>
          <button className="button-style-small" onClick={handleEditToggle}>Edit Todo ✏️</button>
          <button className="button-style-small" onClick={() => onRemoveTodo(todo.id)}>Remove Todo 🗑️</button>
        </div>
      )}

      {/* Render EditTodoForm only for the selected todo */}
      {editing && username && (
        <EditTodoForm
          username={username}
          todoId={todo.id}
          initialTitle={todo.title}
          initialCompleted={todo.completed}
          onTodoUpdated={(editedTodoTitle, editedTodoCompleted) => {
            handleEditSubmit(editedTodoTitle, editedTodoCompleted);
          }}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default TodoComponent;
