import React, { useEffect } from 'react';
import './About.css'
import Cards from '../components/Cards';
import Navbar from '../components/Navbar';
import Team from '../components/Team';
import Footer from '../components/Footer';



function About() {


    useEffect(()=>{
      if(!localStorage.getItem("token")) window.location.replace("/");

    },[])

  return (
    <>

     

     
    <div className='bgcolor'>

   <div className='navbar-about'><Navbar /></div>
     <div className="line">
      
        <h1 className='bgclr1'> ABOUT </h1>
        <img src="farmdata1.png" alt="" />
        </div>

        <img src="paper.png" alt="" className='lineimg'/>

        <div className='aboutinfo'>
            <h1>FARM FUSION </h1>
           <div className='relative-container'> <img src="wheat.jpg" alt="" className='wheat'/></div>
        </div>

        
   <div className='cards-about'><Cards /> </div>

   <div className='team-cards'><Team /></div>

   <div><Footer /></div>
    
    
   
 </div>




    </>
  )
}

export default About
