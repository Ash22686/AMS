import React, { useState } from 'react';
import './FarmData.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FarmData() {
  // Farm Data State
  const [farmname, setFarmname] = useState('');
  const [farmarea, setFarmarea] = useState('');
  const [cropPlanted, setCropPlanted] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [expectedYield, setExpectedYield] = useState('');
  const [farmlocation, setfarmlocation] = useState('');

  // Farm Data Submission
  const handleFarmSubmit = async (e) => {
    e.preventDefault();

    // Get the JWT token from localStorage (or sessionStorage)
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/farmdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          farmname,
          farmlocation,
          farmarea,
          cropPlanted,
          datePlanted,
          expectedYield,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Profile submitted successfully!");

        // Reset the form fields to empty strings after successful submission
        setFarmname("");
        setFarmarea("");
        setCropPlanted("");
        setDatePlanted("");
        setExpectedYield("");
        setfarmlocation("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to submit farm data.");
      }
    } catch (error) {
      console.error("Error submitting farm data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="farm-data">
      <ToastContainer autoClose = {3000}/>
      {/* Farm Data Form */}
      <h1 className="bgclr3 h">Farm Data</h1>
      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <form
            onSubmit={handleFarmSubmit}
            className="grid max-w-4xl gap-4 py-10 px-10 sm:grid-cols-2 bg-white rounded-md mt-16"
          >
            {/* Farm Name */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="farmname"
                  id="farmname"
                  value={farmname}
                  onChange={(e) => setFarmname(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Farm Name"
                />
              </div>
            </div>

            {/* Farm Location */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="farmlocation"
                  id="farmlocation"
                  value={farmlocation}
                  onChange={(e) => setfarmlocation(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Farm Location"
                />
              </div>
            </div>

            {/* Farm Area */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="farmarea"
                  id="farmarea"
                  value={farmarea}
                  onChange={(e) => setFarmarea(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Farm Area (in acres)"
                />
              </div>
            </div>

            {/* Crop Planted */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="cropPlanted"
                  id="cropPlanted"
                  value={cropPlanted}
                  onChange={(e) => setCropPlanted(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Crop Planted"
                />
              </div>
            </div>

            {/* Date Planted */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="datePlanted"
                  id="datePlanted"
                  value={datePlanted}
                  onChange={(e) => setDatePlanted(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Date Planted (YYYY/MM/DD)"
                  pattern="\d{4}/\d{2}/\d{2}"
                />
              </div>
            </div>

            {/* Expected Yield */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="expectedYield"
                  id="expectedYield"
                  value={expectedYield}
                  onChange={(e) => setExpectedYield(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Expected Yield (in tons)"
                />
              </div>
            </div>

            {/* Submit Button for Farm Data */}
            <div className="flex justify-center items-center w-full col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white py-3 px-10 rounded-md hover:bg-purple-600 text-lg"
              >
                Submit Farm Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmData;
