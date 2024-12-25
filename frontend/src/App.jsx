import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './context/Navbar'
import Register from './context/Register'
import { AuthProvider } from './context/AuthContext'
import Login from './context/LoginC'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
