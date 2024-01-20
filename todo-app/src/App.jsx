import './App.css'
import Loading from './components/Loading'
import { useState, useEffect } from 'react'
import axios from 'axios';
import TodoList from './components/TodoList';

function App() {
  const dataUrl = 'https://jsonplaceholder.typicode.com/todos'
  const [todos, setTodos] = useState(null)

  const onUpdateTodo = (todo) => {
    const todoItemIndex = todos.findIndex((x) => x.id == todo.id);
    const newTodos = [...todos];

    const newTodo = newTodos[todoItemIndex];
    newTodo.completed = !newTodo.completed;
    newTodos[todoItemIndex] = newTodo;
    setTodos(newTodos);
  };



  useEffect(() => {
    axios.get(dataUrl).then((result) => {
      setTodos(result.data)
    })
  }, []) // only when components loads this one will run

  return (
    <>
      {todos ? (
        <TodoList todos={todos} onUpdateTodo={onUpdateTodo} />
      ) : (
        <Loading />
      )}    </>
  )
}

export default App
