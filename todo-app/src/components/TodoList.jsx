import { useState, useEffect } from "react";
import axios from 'axios';


const TodoList = () => {
  const geturl = "http://localhost:3000"

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editableTodo, setEditableTodo] = useState(null);

  const getTodos = () =>
    axios
      .get(`${geturl}/todos`)
      .then((resp) => setTodos(resp.data));

  useEffect(() => {
    getTodos();
  }, []);

  const handleNewTodo = (event) => {
    event.preventDefault();
    if (!newTodo) {
      return;
    }
    const data = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      todo: newTodo,
      completed: false,
    };
    axios
      .post(`${geturl}/todos`, data)
      .then((resp) => setTodos([...todos, resp.data]));
    setNewTodo("");
  };

  const handleDelete = (todo) => {
    axios
      .delete(`${geturl}/todos/${todo.id}`)
      .then((resp) => {
        const newTodos = todos.filter((el) => el.id !== todo.id);
        setTodos(newTodos);
      })
      .catch((err) => console.log(err));
  };

  const toggleComplete = (todo) => {
    axios
      .put(`${geturl}/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      })
      .then((resp) => {
        const newTodos = todos.map((el) => {
          if (el.id !== todo.id) {
            return el;
          } else {
            return resp.data;
          }
        });
        setTodos(newTodos);
      });
  };

  const handleEditTodo = (event) => {
    event.preventDefault();
    if (!editableTodo || !editableTodo.todo) {
      return;
    }
    axios
      .put(`${geturl}/todos/${editableTodo.id}`, editableTodo)
      .then((resp) => {
        const newTodos = todos.map((el) => {
          if (el.id !== editableTodo.id) {
            return el;
          }
          return editableTodo;
        });
        setTodos(newTodos);
        setEditableTodo(null);
      });
  };

  return (
    <div>
      <form onSubmit={handleNewTodo}>
        <input
          type="text"
          placeholder="add todo"
          value={newTodo}
          className="form-control"
          onChange={(event) => setNewTodo(event.target.value)}
        />
      </form>
      {todos.map((todo) =>
        editableTodo && editableTodo.id === todo.id ? (
          <div key={todo.id}
            className="d-flex justify-content-between align-items-center">
            <form onSubmit={handleEditTodo}>
              <input
                type="text"
                value={editableTodo.todo}
                onChange={(event) =>
                  setEditableTodo({
                    ...editableTodo,
                    todo: event.target.value,
                  })
                }
              />
            </form>
            <button onClick={() => setEditableTodo(null)}>X</button>
          </div>
        ) : (
          <div key={todo.id} className="d-flex mt-3 justify-content-between align-items-center">
            <p
              onClick={() => toggleComplete(todo)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}>
              {todo.todo}
            </p>
            <div className="d-flex justify-content-between align-items-center">
            <button style={{marginRight:"5px"}} onClick={() => setEditableTodo(todo)}>E</button>
            <button onClick={() => handleDelete(todo)}>X</button>
              
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TodoList;