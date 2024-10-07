import React, { useState } from "react";
import "../components/css/Register.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    accountNumber: "",
    idNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  
  const handleLogin = () => {
    console.log("Login button clicked");
    // Here you would typically redirect to the login page
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="input-row">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-row">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Account Number"
            required
          />
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="ID Number"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="login-section">
        <p>Already have an account?</p>
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Register;