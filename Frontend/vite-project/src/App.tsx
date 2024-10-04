import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './components/css/App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Router >
   
    <div className="app-content">
    <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payments" element={<div>Payments Page</div>} />
          </Routes>
        </div>
  </Router>
  </div>
  );
}

export default App
