import React, { useState } from "react";
import '../components/css/Login.css';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const checkServer = async () => {
    try {
      const response = await fetch('https://localhost:3000/'); // Adjust endpoint as needed
      return response.ok; // Return true if the server is responding
    } catch (error) {
      console.error('Server not reachable:', error);
      return false; // Return false if there's an error
    }
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    // Check if the server is running
    const isServerRunning = await checkServer();
    if (!isServerRunning) {
      console.error('Server is not running. Please start the backend server.');
      setErrorMessage('Server is not reachable. Please try again later.');
      return;
    }
  
    console.log("Logging in user:", data.username);
  
    try {
      const response = await fetch("https://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      console.log("Login API response status:", response.status);
  
      if (response.ok) {
        const result = await response.json();
        console.log("Login successful, response data:", result);
  
        // Log the token immediately after it's returned from the backend
        console.log("Token received:", result.token);
  
        // Save the token to localStorage
        localStorage.setItem("token", result.token);//local storage
  
        // Verify if the token is saved correctly
        const storedToken = localStorage.getItem("token");//local satorage
        if (storedToken) {
          console.log("Token stored in localStorage:", storedToken);
        } else {
          console.error("Failed to save token in localStorage.");
        }
  
        // Check if the user is an employee and navigate accordingly
        if (result.userType === 'employee') {
          navigate("/employeedashboard"); // Redirect to Employee Dashboard
        } else {
          navigate("/"); // Redirect to home for customers
        }
      } else {
        const error = await response.json();
        console.error("Login failed:", error.message || "Unknown error");
        setErrorMessage(error.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage("An error occurred, please try again later.");
    }
  };
  
  

  const handleRegisterClick = () => {
    window.location.href = "/Register";
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginUser} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            placeholder="Username or Account Number"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div className="register-section">
        <p>Don't have an account?</p>
        <button type="button" onClick={handleRegisterClick} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
