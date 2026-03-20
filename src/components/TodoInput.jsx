import { useState } from 'react';

function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input - no empty tasks
    if (!inputValue.trim()) {
      setError('Please enter a task');
      return;
    }

    // Add the todo with priority and due date
    onAdd(inputValue, priority, dueDate || null);
    
    // Reset form
    setInputValue('');
    setPriority('medium');
    setDueDate('');
    setShowOptions(false);
    setError('');
  };

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <div className="input-main">
        <div className="input-wrapper">
          <span className="input-icon">✨</span>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="What would you like to accomplish?"
            className={error ? 'input-error' : ''}
            aria-label="New todo input"
          />
          <button 
            type="button" 
            className={`options-toggle ${showOptions ? 'active' : ''}`}
            onClick={() => setShowOptions(!showOptions)}
            aria-label="Toggle options"
          >
            ⚙️
          </button>
          <button type="submit" className="add-btn" aria-label="Add todo">
            <span className="btn-text">Add Task</span>
            <span className="btn-icon">+</span>
          </button>
        </div>
        {error && <span className="error-message">{error}</span>}
      </div>

      {showOptions && (
        <div className="input-options">
          <div className="option-group">
            <label>Priority</label>
            <div className="priority-buttons">
              {['low', 'medium', 'high'].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`priority-btn priority-${p} ${priority === p ? 'active' : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p === 'high' && '🔴'}
                  {p === 'medium' && '🟡'}
                  {p === 'low' && '🟢'}
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="option-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              className="date-input"
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoInput;
