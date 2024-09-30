import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import './Yield.css'

import 'react-toastify/dist/ReactToastify.css';

function CropRecommendation() {



  useEffect(() => {
    if(!localStorage.getItem("token")) window.location.replace("/login");

  }, []);

  // Crop Data State
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [prediction, setPrediction] = useState("");

  const modalRef = useRef(null);

  // Close the result when clicked outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setPrediction(""); // Close the result modal
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (prediction) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [prediction]);

  // Personal Data Submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check for empty fields
    if (!nitrogen || !phosphorus || !potassium || !temperature || !humidity || !ph || !rainfall) {
      toast.error("All fields are required!");
      return; // Stop submission if validation fails
    }
  
    // Prepare the data to send to the backend
    const requestData = {
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
    };
  
    console.log("Sending data to the server:", requestData); // Debug: log the data
  
    // Use fetch to send a POST request to the Flask backend
    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        console.log("Server response:", response); // Debug: log the raw response
        return response.json();
      })
      .then((data) => {
        // Handle the prediction response
        console.log("Data received from server:", data); // Debug: log the data
        if (data.prediction) {
          setPrediction(data.prediction); // Set the prediction result
        } else if (data.error) {
          // biome-ignore lint/style/useTemplate: <explanation>
          alert("Error: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Debug: log the error
      });
  
    // Clear input fields after submission
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setTemperature("");
    setHumidity("");
    setPh("");
    setRainfall("");
  };
  
  // Close the result modal when the cross (X) is clicked
  const closeResult = () => {
    setPrediction("");
  };
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div>
      <ToastContainer autoClose = {3000}/>
      <div className={`farm-data ${prediction ? 'blur-sm' : ''}`}>
        <div className="w-screen pl-20 pr-8">
          <Navbar />
        </div>
        {/* Personal Data Form */}
        <h1 className="bgclr h">Crop Recommendation</h1>
        <div className="min-h-screen w-full flex justify-center">
          <img src="yieldbg1.png" alt="" className="img1 size-"/>
          <img src="yieldbg2.png" alt="" className="img2 size-80" />
          <div className="w-full max-w-4xl">
            <form
              onSubmit={handleSubmit}
              className="grid max-w-4xl gap-4 py-10 px-10 sm:grid-cols-2 bg-white rounded-md mt-16"
            >
              {/* Nitrogen */}
              <div className="grid mb-4">
                <div className="relative">
                  <input
                   onFocus={() => setIsInputFocused(true)}
                   onBlur={() => setIsInputFocused(false)}
                    type="text"
                    name="Nitrogen"
                    id="nitrogen"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                    className="block w-full p-0 pt-8 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none border-b focus:border-purple-500 peer"
                    placeholder="Nitrogen"
                  />
                  <label
                    htmlFor="nitrogen"
                    className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Nitrogen
                  </label>
                </div>
              </div>

              {/* Phosphorus */}
              <div className="grid mb-4">
                <div className="relative">
                  <input
                   onFocus={() => setIsInputFocused(true)}
                   onBlur={() => setIsInputFocused(false)}
                    type="text"
                    name="Phosphorus"
                    id="phosphorus"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                    className="block w-full p-0 pt-8 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none border-b focus:border-purple-500 peer"
                    placeholder="Phosphorus"
                  />
                  <label
                    htmlFor="phosphorus"
                    className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Phosphorus
                  </label>
                </div>
              </div>

              {/* Potassium */}
              <div className="grid mb-4">
                <div className="relative">
                  <input
                   onFocus={() => setIsInputFocused(true)}
                   onBlur={() => setIsInputFocused(false)}
                    type="text"
                    name="Potassium"
                    id="potassium"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value)}
                    className="block w-full p-0 pt-8 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none border-b focus:border-purple-500 peer"
                    placeholder="Potassium"
                  />
                  <label
                    htmlFor="potassium"
                    className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Potassium
                  </label>
                </div>
              </div>

              {/* Temperature */}
              <div className="grid mb-4">
                <div className="relative">
                  <input
                   onFocus={() => setIsInputFocused(true)}
                   onBlur={() => setIsInputFocused(false)}
                    type="text"
                    name="Temperature"
                    id="temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="block w-full p-0 pt-8 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none border-b focus:border-purple-500 peer"
                    placeholder="Temperature"
                  />
                  <label
                    htmlFor="temperature"
                    className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Temperature in °C
                  </label>
                </div>
              </div>

              {/* Humidity */}
              <div className="grid mb-4">
                <div className="relative">
                  <input
                   onFocus={() => setIsInputFocused(true)}
                   onBlur={() => setIsInputFocused(false)}
                    type="text"
                    name="Humidity"
                    id="humidity"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    className="block w-full p-0 pt-8 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none border-b focus:border-purple-500 peer"
                    placeholder="Humidity"
                  />
                  <label
                    htmlFor="humidity"
                    className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Humidity
                  </label>
                </div>
              </div>

              {/* PH */}
              <div className="grid mb-4">
                <div className="relative">
                  <input
                   onFocus={() => setIsInputFocused(true)}
                   onBlur={() => setIsInputFocused(false)}
                    type="text"
                    name="PH"
                    id="ph"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    className="block w-full p-0 pt-8 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none border-b focus:border-purple-500 peer"
                    placeholder="PH"
                  />
                  <label
                    htmlFor="ph"
                    className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    PH
                  </label>
                </div>
              </div>

              {/* Rainfall */}
              <div className="grid mb-4">
                <div className="relative">
                  <input
                   onFocus={() => setIsInputFocused(true)}
                   onBlur={() => setIsInputFocused(false)}
                    type="text"
                    name="Rainfall"
                    id="rainfall"
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                    className="block w-full p-0 pt-8 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none border-b focus:border-purple-500 peer"
                    placeholder="Rainfall"
                  />
                  <label
                    htmlFor="rainfall"
                    className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Rainfall in mm
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center w-full col-span-2">
                <button
                  type="submit"
                  onClick={() => console.log("Button clicked!")} // Log button click
                  className="bg-purple-500 text-white py-3 px-10 rounded-md hover:bg-purple-600 text-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Prediction Result with Blur Effect and Close Functionality */}
      {prediction && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div
            className="bg-white text-black p-8 rounded-lg shadow-md w-96 relative"
            ref={modalRef}
          >
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeResult}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Recommended Crop</h2>
            <p className="text-lg uppercase">{prediction}</p> {/* Uppercase text */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CropRecommendation;
