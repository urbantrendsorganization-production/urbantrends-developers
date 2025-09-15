import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProjects from './pages/AddProjects'
import Projects from './pages/Projects'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add-project' element={<AddProjects />} />
      <Route path='/projects' element={<Projects />} />
    </Routes>
  )
}

export default App