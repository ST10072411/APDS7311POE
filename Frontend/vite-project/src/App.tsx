import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './components/css/App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Payments from './pages/Payments'
import Register from './pages/Register'
import EmployeeDashboard from './pages/EmployeeDashboard'

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
            <Route path="/payments" element={<Payments />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employeedashboard" element={<EmployeeDashboard/>}/>
          </Routes>
        </div>
  </Router>
  </div>
  );
}

export default App
