import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function Login({ onLogin }) {
  // Accept onLogin as a prop
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input change for registration form
  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle input change for login form
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle form submission for registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        setIsSignUp(false);
      } else {
        const data = await response.json();
        toast.error(data.error || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Handle form submission for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
      console.log(data);
       // Parse the JSON response
      if (response.ok) {
        console.log("Login successful:", data.token);
        localStorage.setItem("token", data.token); // Store JWT token in localStorage
        toast.success("Login Successful!"); // Show success toast
  
            onLogin(data.token); // Call onLogin to update authentication state
  
        // Delay navigation to allow the toast to appear
console.log("navigating to Login");

          navigate("/home"); // Redirect to home page
        
      } else {
        console.error("Login failed:", data.error || "Unknown error");
        toast.error(data.error || "Login failed!"); // Show error toast
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  
  
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
    <div className={`container ${isSignUp ? "active" : ""}`}>
      <ToastContainer autoClose = {1000}/>
      <div className="form-container sign-up">
        <form onSubmit={handleRegisterSubmit}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <Link to="#" className="icon">
              <i className="fa-brands fa-google"/>
            </Link>
            <Link to="#" className="icon">
              <i className="fa-brands fa-facebook-f"/>
            </Link>
            <Link to="#" className="icon">
              <i className="fa-brands fa-github"/>
            </Link>
            <Link to="#" className="icon">
              <i className="fa-brands fa-linkedin"/>
            </Link>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleRegisterChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleRegisterChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <Link to="#" className="icon">
              <i className="fa-brands fa-google"/>
            </Link>
            <Link to="#" className="icon">
              <i className="fa-brands fa-facebook-f"/>
            </Link>
            <Link to="#" className="icon">
              <i className="fa-brands fa-github"/>
            </Link>
            <Link to="#" className="icon">
              <i className="fa-brands fa-linkedin"/>
            </Link>
          </div>
          <span>or use your email</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <button type="submit">Sign In</button>
          <Link to="#">Forget Your Password</Link>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>
              Enter your personal details to enjoy all of our site's features
            </p>
            <button
              className="toggle-button"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello there!</h1>
            <p>
              Register with your details to get access to all of our site's
              features
            </p>
            <button className="toggle-button" onClick={() => setIsSignUp(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
