import React, { useState } from "react";
import '../components/css/Login.css';
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [data, setData] = useState({
    username: "",
    accountNumber: "",
    password: "",
  });

  /*
  const internationalPayment = () => {
    window.location.href = "/Payments"; // Navigate to the international payment page
  };*/

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
  
    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      console.log("User Logged in");  

         // Fetch the login API endpoint
    try {
      const response = await fetch("https://localhost:5000/api/user/login", { // need to add our api - my best guess at the name
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User logged in successfully", result);
        setSuccessMessage("Login successful!");
        localStorage.setItem("token", result.token);
        window.location.href = "/Home";
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later.");
    }
  };

  /*
  const handleEmployeeLoginClick = () => {
    navigate("/employee-login");
  };
  */
 
    // Function to handle form submission
   /* const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Example: Add your authentication logic here
      if (!username || !password) {
        setError("Please enter both username and password");
        return;
      }
      setError("");
      console.log("Logged In:", { username, password });
      // Redirect to dashboard or process login
    };*/
  
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

        {/* Button to handle employee login for pt 3: 
        <button type="button" onClick={handleEmployeeLoginClick}>
          Employee Login
        </button>*/}
        

      </div>
    );
  };
  
  export default Login;
