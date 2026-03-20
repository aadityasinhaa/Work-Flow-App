import { useState, useEffect, useCallback } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import ProgressBar from './components/ProgressBar';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  // State management
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState(null);
  const [deletedTodo, setDeletedTodo] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage('soundEnabled', true);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-input')?.focus();
      }
      // Ctrl/Cmd + N for new task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.querySelector('.todo-input input')?.focus();
      }
      // ? for shortcuts modal
      if (e.key === '?' && !e.target.matches('input, textarea')) {
        setShowShortcuts(true);
      }
      // Escape to close modal
      if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
      // Ctrl/Cmd + Z to undo delete
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && deletedTodo) {
        e.preventDefault();
        undoDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deletedTodo]);

  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    const sounds = {
      add: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAAB/f39/f39/f39/gICAgICBgYKCgoODhISFhYaGh4eIiImJioqLi4yMjY2OjpCQkZGSkpOUlJWVlpaXl5iY',
      complete: 'data:audio/wav;base64,UklGRmYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUIAAAB/gICBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcI=',
      delete: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAACAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtK'
    };
    try {
      const audio = new Audio(sounds[type]);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {}
  }, [soundEnabled]);

  // Show toast notification
  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), duration);
  };

  // Add a new todo
  const addTodo = (text, priority = 'medium', dueDate = null) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      dueDate,
    };
    setTodos([newTodo, ...todos]);
    playSound('add');
    showToast('Task added successfully!', 'success');
  };

  // Delete a todo with undo
  const deleteTodo = (id) => {
    const todoToDelete = todos.find(t => t.id === id);
    setDeletedTodo(todoToDelete);
    setTodos(todos.filter(todo => todo.id !== id));
    playSound('delete');
    showToast('Task deleted. Press Ctrl+Z to undo', 'warning', 5000);
  };

  // Undo delete
  const undoDelete = () => {
    if (deletedTodo) {
      setTodos([deletedTodo, ...todos]);
      setDeletedTodo(null);
      showToast('Task restored!', 'success');
    }
  };

  // Toggle todo completion status
  const toggleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo.completed) {
      playSound('complete');
      // Trigger confetti for completion
      triggerConfetti();
    }
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null } : todo
    ));
  };

  // Confetti effect
  const triggerConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.backgroundColor = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)];
      confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => confettiContainer.remove(), 2000);
  };

  // Edit todo
  const editTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
    showToast('Task updated', 'info');
  };

  // Update priority
  const updatePriority = (id, priority) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, priority } : todo
    ));
  };

  // Clear all completed todos
  const clearCompleted = () => {
    const completedCount = todos.filter(t => t.completed).length;
    setTodos(todos.filter(todo => !todo.completed));
    showToast(`Cleared ${completedCount} completed tasks`, 'info');
  };

  // Filter and sort todos
  const getFilteredTodos = () => {
    let filtered = todos;
    
    // Apply filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'high':
        filtered = filtered.filter(todo => todo.priority === 'high');
        break;
      case 'today':
        const today = new Date().toDateString();
        filtered = filtered.filter(todo => 
          todo.dueDate && new Date(todo.dueDate).toDateString() === today
        );
        break;
    }
    
    // Apply search
    if (searchQuery.trim()) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sort
    switch (sortBy) {
      case 'oldest':
        filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filtered = [...filtered].sort((a, b) => priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']);
        break;
      case 'dueDate':
        filtered = [...filtered].sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case 'alphabetical':
        filtered = [...filtered].sort((a, b) => a.text.localeCompare(b.text));
        break;
      default: // newest
        filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return filtered;
  };

  // Calculate stats
  const totalCount = todos.length;
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const highPriorityCount = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Get overdue tasks
  const overdueCount = todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  }).length;

  return (
    <div className="app">
      {/* Animated background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <header className="app-header">
        <div className="header-left">
          <h1>
            <img src="/logo.png" alt="WorkFlow" className="logo-image" />
          </h1>
          <span className="header-tagline">Stay organized, stay productive</span>
        </div>
        <div className="header-actions">
          <button 
            className="header-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label="Toggle sound"
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button 
            className="header-btn"
            onClick={() => setShowShortcuts(true)}
            aria-label="Keyboard shortcuts"
            title="Keyboard Shortcuts (?)"
          >
            ⌨️
          </button>
          <button 
            className="header-btn dark-mode-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="main-content">
          <TodoInput onAdd={addTodo} />
          
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {totalCount > 0 && (
            <ProgressBar 
              percentage={completionPercentage}
              completed={completedCount}
              total={totalCount}
            />
          )}
          
          <Stats 
            totalCount={totalCount}
            activeCount={activeCount}
            completedCount={completedCount}
            highPriorityCount={highPriorityCount}
            overdueCount={overdueCount}
            onClearCompleted={clearCompleted}
            hasCompleted={completedCount > 0}
          />

          <FilterBar 
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={{
              all: totalCount,
              active: activeCount,
              completed: completedCount,
              high: todos.filter(t => t.priority === 'high').length,
            }}
          />

          <TodoList 
            todos={getFilteredTodos()}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onPriorityChange={updatePriority}
          />

          {todos.length === 0 && (
            <div className="empty-state">
              <div className="empty-illustration">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="currentColor" opacity="0.1"/>
                  <path d="M70 100l20 20 40-40" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="4" strokeDasharray="10 5" opacity="0.2"/>
                </svg>
              </div>
              <h3>No tasks yet</h3>
              <p>Add your first task to get started on your productivity journey!</p>
              <div className="empty-hint">
                <kbd>Ctrl</kbd> + <kbd>N</kbd> to quickly add a task
              </div>
            </div>
          )}

          {todos.length > 0 && getFilteredTodos().length === 0 && (
            <div className="empty-state">
              <h3>No matching tasks</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>WorkFlow • Press <kbd>?</kbd> for shortcuts</p>
      </footer>

      {/* Toast notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)}
        />
      )}

      {/* Keyboard shortcuts modal */}
      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  );
}

export default App;
