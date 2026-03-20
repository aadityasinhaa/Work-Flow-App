function SearchBar({ value, onChange, sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: '🆕' },
    { value: 'oldest', label: 'Oldest First', icon: '📅' },
    { value: 'priority', label: 'By Priority', icon: '🔥' },
    { value: 'dueDate', label: 'By Due Date', icon: '⏰' },
    { value: 'alphabetical', label: 'A-Z', icon: '🔤' },
  ];

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search tasks... (Ctrl+K)"
          className="search-input"
          aria-label="Search tasks"
        />
        {value && (
          <button 
            className="search-clear" 
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className="sort-wrapper">
        <span className="sort-icon">↕️</span>
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
          aria-label="Sort tasks"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
