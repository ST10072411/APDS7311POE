import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <main>
        <h2>Welcome to My App</h2>
        <p>This is a simple React app with a navbar.</p>
      </main>
    </div>
  );
}

export default App
