import React from 'react'
import Login from './component/Login'
import "./App.css"
import TodoList from './component/TodoList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div>
  
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/todoapp' element={<TodoList/>}/>
  </Routes>
  </BrowserRouter>
   
    </div>
  )
}

export default App