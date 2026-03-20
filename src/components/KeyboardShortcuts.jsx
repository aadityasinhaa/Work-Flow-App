function KeyboardShortcuts({ onClose }) {
  const shortcuts = [
    { keys: ['Ctrl', 'N'], description: 'New task' },
    { keys: ['Ctrl', 'K'], description: 'Focus search' },
    { keys: ['Ctrl', 'Z'], description: 'Undo delete' },
    { keys: ['Enter'], description: 'Add task / Save edit' },
    { keys: ['Escape'], description: 'Cancel edit / Close modal' },
    { keys: ['?'], description: 'Show this help' },
    { keys: ['Double-click'], description: 'Edit task text' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⌨️ Keyboard Shortcuts</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="shortcuts-list">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="shortcut-item">
              <div className="shortcut-keys">
                {shortcut.keys.map((key, i) => (
                  <span key={i}>
                    <kbd>{key}</kbd>
                    {i < shortcut.keys.length - 1 && <span className="key-separator">+</span>}
                  </span>
                ))}
              </div>
              <span className="shortcut-description">{shortcut.description}</span>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <p>Press <kbd>Escape</kbd> to close</p>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;
