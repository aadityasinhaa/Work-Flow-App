# 📝 Modern To-Do List Application

A beautiful, responsive, and feature-rich To-Do List application built with React and Vite.

## ✨ Features

### Core Features
- ✅ **Add Tasks**: Create new to-do items with validation
- ✅ **Complete Tasks**: Mark tasks as complete/incomplete with visual feedback
- ✅ **Edit Tasks**: Inline editing with keyboard shortcuts
- ✅ **Delete Tasks**: Remove individual tasks
- ✅ **Persistent Storage**: All tasks saved to localStorage
- ✅ **Timestamps**: Each task shows creation date/time

### Advanced Features
- 🎯 **Smart Filters**: View All, Active, or Completed tasks
- 📊 **Statistics**: Real-time counts for total, active, and completed tasks
- 🧹 **Bulk Actions**: Clear all completed tasks at once
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on mobile and desktop
- ✨ **Smooth Animations**: Polished transitions for all interactions
- ♿ **Accessible**: Full keyboard navigation and ARIA labels

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "To-Do-List App"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 🏗️ Project Structure

```
To-Do-List App/
├── src/
│   ├── components/
│   │   ├── TodoInput.jsx      # Input field with validation
│   │   ├── TodoList.jsx       # List container
│   │   ├── TodoItem.jsx       # Individual task item
│   │   ├── FilterBar.jsx      # Filter buttons
│   │   └── Stats.jsx          # Statistics display
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook for persistence
│   ├── utils/
│   │   └── todoHelpers.js     # Helper functions
│   ├── App.jsx                # Main app component
│   ├── App.css                # Styles
│   └── main.jsx               # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Tech Stack

- **React 19**: Modern UI library with hooks
- **Vite**: Lightning-fast build tool
- **CSS3**: Custom styling with CSS variables
- **localStorage**: Client-side data persistence

## 💡 Usage

### Adding a Task
1. Type your task in the input field
2. Press `Enter` or click the "Add" button
3. The task appears at the top of the list

### Completing a Task
- Click the checkbox next to any task to mark it complete
- Completed tasks show with a strikethrough and faded appearance

### Editing a Task
1. Click the ✏️ edit button on any task
2. Make your changes in the inline editor
3. Press `Enter` to save or `Escape` to cancel
4. Changes are saved automatically on blur

### Deleting a Task
- Click the 🗑️ delete button to remove a task

### Filtering Tasks
- Click **All** to see all tasks
- Click **Active** to see only incomplete tasks
- Click **Completed** to see only finished tasks

### Dark Mode
- Click the 🌙/☀️ button in the header to toggle themes
- Your preference is saved automatically

### Clearing Completed Tasks
- Click "Clear Completed" in the stats bar to remove all finished tasks

## 🎯 Keyboard Shortcuts

- `Enter`: Submit new task or save edit
- `Escape`: Cancel edit mode
- `Tab`: Navigate between elements

## 🏗️ Component Architecture

### App.jsx
- Main application component
- Manages global state (todos, filter, dark mode)
- Handles all business logic (CRUD operations)
- Coordinates child components

### TodoInput.jsx
- Controlled input component
- Input validation
- Form submission handling

### TodoList.jsx
- Renders filtered list of todos
- Passes callbacks to TodoItem components

### TodoItem.jsx
- Individual task display
- Inline editing functionality
- Complete/Edit/Delete actions
- Date formatting

### FilterBar.jsx
- Filter button group
- Active state management

### Stats.jsx
- Displays task counts
- Clear completed button

### useLocalStorage Hook
- Custom hook for localStorage sync
- Automatic serialization/deserialization
- Error handling

## 🎨 Styling Features

- **CSS Variables**: Easy theme customization
- **Dark Mode**: Automatic color scheme switching
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design with breakpoints
- **Accessibility**: Reduced motion support for users with motion sensitivity

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 🔧 Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## 🌟 Best Practices Implemented

- ✅ Functional components with hooks
- ✅ Separation of concerns (UI, logic, storage)
- ✅ Modular component structure
- ✅ Custom hooks for reusable logic
- ✅ PropTypes for type safety (can be added)
- ✅ Clean code with comments
- ✅ ES6+ features (arrow functions, destructuring, spread operator)
- ✅ No global variables
- ✅ Event delegation where appropriate
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Performance optimized (minimal re-renders)

## 🚧 Future Enhancements

- [ ] Task priorities (high, medium, low)
- [ ] Due dates and reminders
- [ ] Categories/Tags
- [ ] Search functionality
- [ ] Drag and drop reordering
- [ ] Export/Import tasks
- [ ] Multiple lists
- [ ] Subtasks
- [ ] Cloud sync

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using React and Vite

---

Enjoy staying organized! 🎉
