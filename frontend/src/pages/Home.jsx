import React, { useEffect } from 'react';
import './Home.css';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';
import Contact from '../components/Contact';


function Home() {
  

  // // Function to handle user logout
  // const handleLogout = () => {
  //   // Remove the JWT token from localStorage
  //   localStorage.removeItem("token");
  //   // Redirect to login page
  //   onLogout();
  //   navigate("/login");
  // };

  
  
  useEffect(() => {
    
    console.log(localStorage.getItem("token"));
     if(!localStorage.getItem("token")) window.location.replace("/");
    // Add event listeners after the component mounts
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    if (container && registerBtn && loginBtn) {
      registerBtn.addEventListener("click", () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
      });
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (container && registerBtn && loginBtn) {
        registerBtn.removeEventListener("click", () => {
          container.classList.add("active");
        });

        loginBtn.removeEventListener("click", () => {
          container.classList.remove("active");
        });
      }
    };
  }, []);


  return (
    <div>
      <div id="main">
        <div id="page1">
          
          <Navbar />

          <div id="flex">
          <img src="bg.jpg" alt="" />
            <h1 id="center">
              AGRICULTURE <br /> MANAGEMENT <br /> SYSTEM
            </h1>
            <video
              autoPlay
              loop
              muted
              src="videoplayback.webm"
              className="video-container"
            />
          </div>
          
        </div>
        <div className='mb-20'><Services /></div>
        <div className='mb-20'><Contact /></div>
        <div><Footer /></div>
      </div>
    </div>
  );
}

export default Home;
