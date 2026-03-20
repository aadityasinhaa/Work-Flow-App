function Stats({ totalCount, activeCount, completedCount, highPriorityCount, overdueCount, onClearCompleted, hasCompleted }) {
  return (
    <div className="stats">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <span className="stat-value">{totalCount}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <div className="stat-info">
            <span className="stat-value">{activeCount}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card success">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>
        {highPriorityCount > 0 && (
          <div className="stat-card warning">
            <span className="stat-icon">🔥</span>
            <div className="stat-info">
              <span className="stat-value">{highPriorityCount}</span>
              <span className="stat-label">Priority</span>
            </div>
          </div>
        )}
        {overdueCount > 0 && (
          <div className="stat-card danger">
            <span className="stat-icon">⚠️</span>
            <div className="stat-info">
              <span className="stat-value">{overdueCount}</span>
              <span className="stat-label">Overdue</span>
            </div>
          </div>
        )}
      </div>
      
      {hasCompleted && (
        <button 
          onClick={onClearCompleted}
          className="clear-completed-btn"
          aria-label="Clear all completed tasks"
        >
          <span>🧹</span> Clear Completed
        </button>
      )}
    </div>
  );
}

export default Stats;
