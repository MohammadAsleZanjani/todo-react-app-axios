const TodoList = ({ todos, addTodo, deleteTodo }) => {
    const handleAddTodo = () => {
        // Create a new todo object
        const newTodo = {
          id: Date.now(),
          title: 'New Todo',
          completed: false,
        };
    
        // Add the new todo to the list of todos
        addTodo(newTodo);
      };
    
      const handleDeleteTodo = (id) => {
        // Delete the todo with the given id
        deleteTodo(id);
      };
    
    return (
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onUpdateTodo(todo)}
            />
          </li>
        ))}
      </ul>
    );
  };
  
  export default TodoList;