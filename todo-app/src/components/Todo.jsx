import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

function Todo() {
    const dataUrl = 'https://jsonplaceholder.typicode.com/todos'
    const [todo, setTodo] = useState()
    useEffect(()=>{
        axios.get(dataUrl).then((result)=>{
            console.log('Promise fulfilled', result.data)
        })
    },[]) // only when components loads this one will run
    return (
        <div>
        </div>
    )
}

export default Todo