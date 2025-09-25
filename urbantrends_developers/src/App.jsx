import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProjects from './pages/AddProjects'
import Projects from './pages/Projects'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/add-project' element={<AddProjects />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </>
  )
}

export default App