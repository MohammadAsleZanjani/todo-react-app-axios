function TodoItem(props) {
    const { todo, onDelete } = props;
  
    return (
      <div>
        <h3>{todo.title}</h3>
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  }