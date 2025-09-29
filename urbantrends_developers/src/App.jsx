import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProjects from './pages/AddProjects'
import Projects from './pages/Projects'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Header />
      {/* toast notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#4ade80', // green-400
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#f87171', // red-400
              color: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/add-project' element={<AddProjects />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </>
  )
}

export default App