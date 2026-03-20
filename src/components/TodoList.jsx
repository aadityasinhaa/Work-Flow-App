import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit, onPriorityChange }) {
  if (todos.length === 0) {
    return null;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onPriorityChange={onPriorityChange}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </ul>
  );
}

export default TodoList;
