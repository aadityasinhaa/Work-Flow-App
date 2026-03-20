import { useState, useRef, useEffect } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit, onPriorityChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const inputRef = useRef(null);
  const priorityRef = useRef(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Close priority menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (priorityRef.current && !priorityRef.current.contains(e.target)) {
        setShowPriorityMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle edit save
  const handleSave = () => {
    if (editValue.trim() && editValue !== todo.text) {
      onEdit(todo.id, { text: editValue.trim() });
    } else if (!editValue.trim()) {
      setEditValue(todo.text);
    }
    setIsEditing(false);
  };

  // Handle key press in edit mode
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  // Format date with relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Format due date
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Check if overdue
  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  // Priority config
  const priorityConfig = {
    high: { icon: '🔴', label: 'High', color: '#ef4444' },
    medium: { icon: '🟡', label: 'Medium', color: '#f59e0b' },
    low: { icon: '🟢', label: 'Low', color: '#10b981' }
  };

  const currentPriority = priorityConfig[todo.priority] || priorityConfig.medium;

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority || 'medium'} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-checkbox-wrapper">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="checkbox-custom">
          {todo.completed && <span className="checkmark">✓</span>}
        </span>
      </div>

      <div className="todo-content">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="edit-input"
          />
        ) : (
          <div className="todo-text-wrapper">
            <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
              {todo.text}
            </span>
            <div className="todo-meta">
              <span className="todo-date" title={new Date(todo.createdAt).toLocaleString()}>
                {formatDate(todo.createdAt)}
              </span>
              {todo.dueDate && (
                <span className={`todo-due ${isOverdue ? 'overdue' : ''}`}>
                  📅 {formatDueDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {/* Priority button */}
        <div className="priority-dropdown" ref={priorityRef}>
          <button
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            className="btn-priority"
            aria-label="Change priority"
            title={`Priority: ${currentPriority.label}`}
          >
            {currentPriority.icon}
          </button>
          {showPriorityMenu && (
            <div className="priority-menu">
              {Object.entries(priorityConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => {
                    onPriorityChange(todo.id, key);
                    setShowPriorityMenu(false);
                  }}
                  className={`priority-option ${todo.priority === key ? 'active' : ''}`}
                >
                  {config.icon} {config.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-edit"
            aria-label={`Edit "${todo.text}"`}
            title="Edit task"
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="btn-delete"
          aria-label={`Delete "${todo.text}"`}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
