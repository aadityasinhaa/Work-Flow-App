function FilterBar({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'active', label: 'Active', icon: '⏳' },
    { id: 'completed', label: 'Done', icon: '✅' },
    { id: 'high', label: 'Priority', icon: '🔴' },
  ];

  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
          aria-pressed={currentFilter === filter.id}
        >
          <span className="filter-icon">{filter.icon}</span>
          <span className="filter-label">{filter.label}</span>
          {counts && counts[filter.id] !== undefined && (
            <span className="filter-count">{counts[filter.id]}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
