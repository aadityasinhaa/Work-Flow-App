/**
 * Utility functions for todo operations
 */

export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  // If less than 24 hours, show relative time
  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInMs / (1000 * 60));
      return minutes === 0 ? 'Just now' : `${minutes}m ago`;
    }
    return `${Math.floor(diffInHours)}h ago`;
  }

  // Otherwise show formatted date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const validateTodoText = (text) => {
  if (!text || typeof text !== 'string') return false;
  return text.trim().length > 0;
};
