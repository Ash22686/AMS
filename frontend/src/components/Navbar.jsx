  import React from 'react'
  import './Navbar.css'
  import { Link, useNavigate } from "react-router-dom";

  function Navbar({ onLogout }) {

      const navigate = useNavigate();
    // Function to handle user logout
    const handleLogout = () => {
      // Remove the JWT token from localStorage
      localStorage.removeItem("token");
      // Redirect to login page
      onLogout();
      navigate("/");
    };

    return (
      <>
        <nav>
          <h1>FARM FUSION</h1>
          <div id="nav2">
            <h4>
              <Link to="/home">Home</Link>
            </h4>
            <h4>
              <Link to="/layout">Profile</Link>
            </h4>
            <h4>
              <Link to="/About">About</Link>
            </h4>
            <h4>
              <Link to="/Faqs">Faqs</Link>
            </h4>
            <h4>
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            </h4>
            
            
          </div>
        </nav>
      </>
    );
  }

  export default Navbar