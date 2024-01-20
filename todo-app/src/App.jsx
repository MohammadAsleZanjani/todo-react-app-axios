import './App.css'
import Loading from './components/Loading'
import { useState, useEffect } from 'react'
import axios from 'axios';
import TodoList from './components/TodoList';

function App() {
  const dataUrl = 'https://jsonplaceholder.typicode.com/todos'
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    axios.get(dataUrl).then((result) => {
      setTodos(result.data)
    })
  }, []) // only when components loads this one will run

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  return (
    <>
      {todos ? (
        <TodoList todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} />
      ) : (
        <Loading />
      )}    </>
  )
}

export default App
