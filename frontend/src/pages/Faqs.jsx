import React, { useEffect, useState } from 'react';
import './Faqs.css';
import Navbar from '../components/Navbar'

function Faqs() {


  useEffect(() =>{
    if(!localStorage.getItem("token")) window.location.replace("/");

  },[]);


  // State to manage which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function to open/close FAQ items
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
    <div>
      <div className='nav-faqs ml-7'><Navbar /></div>
    <div className="py-12 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 glass">
      
      <div className="flex flex-col text-left basis-1/2">
        <p className="sm:text-4xl text-3xl font-extrabold text-base-content ml-6 mt-4">Frequently Asked Questions</p>
      </div>
      <ul className="basis-1/2">
        {[
          {
            question: "What is Farm Fusion ? ",
            answer: "Farm Fusion is a data-driven platform designed to help farmers make better decisions by providing crop yield predictions, real-time weather data, and personalized irrigation schedules. Our goal is to simplify farm management and improve productivity through the use of technology.",
          },
          {
            question: "How does yield prediction work?",
            answer: "Our system uses advanced algorithms to analyze key factors such as crop type, soil conditions, historical data, and weather patterns. Based on this analysis, we provide accurate forecasts of expected crop yields, helping farmers plan their planting and harvesting schedules more effectively.",
          },
          {
            question: "How do I get real-time weather updates for my farm?",
            answer: "Once you register and enter your farm’s location, our platform automatically provides you with real-time weather data, including temperature, rainfall, wind speed, and humidity. You can access this information directly on your dashboard at any time.",
          },
          {
            question: "How is the irrigation schedule personalized?",
            answer: "Our irrigation schedules are customized based on your farm's specific conditions, including crop type, soil moisture levels, and local weather forecasts. This ensures that your crops receive the right amount of water at the right time, reducing wastage and promoting healthy growth.",
          },
          {
            question: " Can I use this platform for different types of crops?",
            answer: "Yes, our platform supports a wide variety of crops. When you register, you’ll be able to select the specific crops you’re growing, and our system will tailor its recommendations based on the needs of those crops.",
          },
           {
            question: "How do I get started?",
            answer: "Getting started is easy! Simply register on our website, provide basic details about your farm, and you’ll have access to all our services. From there, you can input your farm data and begin receiving yield predictions, weather updates, and irrigation schedules.",
          },
        ].map((faq, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded={openIndex === index ? "true" : "false"}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base-content">{faq.question}</span>
              <svg
                className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition-transform duration-200 ease-out ${
                  openIndex === index ? 'rotate-90' : ''
                 }`}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="7" width="16" height="2" rx="1" />
                <rect y="7" width="16" height="2" rx="1" className="rotate-90" />
              </svg>
            </button>
            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{ maxHeight: openIndex === index ? '200px' : '0' }}
            >
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Faqs;
