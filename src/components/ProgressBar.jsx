function ProgressBar({ percentage, completed, total }) {
  // Determine color based on percentage
  const getColor = () => {
    if (percentage >= 100) return 'var(--success)';
    if (percentage >= 75) return 'var(--accent-primary)';
    if (percentage >= 50) return '#8b5cf6';
    if (percentage >= 25) return '#f59e0b';
    return 'var(--text-muted)';
  };

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">
          {percentage === 100 ? '🎉 All tasks completed!' : `${completed} of ${total} tasks completed`}
        </span>
        <span className="progress-percentage" style={{ color: getColor() }}>
          {percentage}%
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${percentage}%`,
            background: percentage === 100 
              ? 'linear-gradient(90deg, #10b981, #34d399)' 
              : `linear-gradient(90deg, var(--accent-primary), ${getColor()})`
          }}
        >
          {percentage > 10 && (
            <div className="progress-glow"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
