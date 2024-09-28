import React, { useState } from 'react';
import './FarmData.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SoilData() {
  // Soil Data State
  const [ph, setPh] = useState('');
  const [soiltype, setSoiltype] = useState('');
  const [moisture, setMoisture] = useState('');
  const [farm, setFarm] = useState('');

  // Soil Data Submission
  const handleSoilSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!ph || !soiltype || !moisture || !farm) {
      console.log('Form validation failed.');
      return toast.error('All fields are required.');
    }

    console.log({
      ph,
      soiltype,
      moisture,
      farm,
    });

    // Perform the fetch to submit data
    fetch('http://localhost:8080/soildata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ph, soiltype, moisture, farm }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        toast.success('Soil data submitted successfully!');
        
        // Reset form fields to show placeholders again
        setPh('');
        setSoiltype('');
        setMoisture('');
        setFarm('');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error submitting soil data.');
      });
  };

  return (
    <div className="farm-data">
      <ToastContainer autoClose= {3000}/>
      {/* Soil Data Form */}
      <h1 className="bgclr3 h">Soil Data</h1>
      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <form
            onSubmit={handleSoilSubmit}
            className="grid max-w-4xl gap-4 py-10 px-10 sm:grid-cols-2 bg-white rounded-md mt-16"
          >
            {/* Farm Name */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="farm"
                  id="farm"
                  value={farm}
                  onChange={(e) => setFarm(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Farm Name"
                />
              </div>
            </div>

            {/* Soil Type */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="soiltype"
                  id="soiltype"
                  value={soiltype}
                  onChange={(e) => setSoiltype(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Soil Type"
                />
              </div>
            </div>

            {/* Soil PH */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="ph"
                  id="ph"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Soil PH"
                />
              </div>
            </div>

            {/* Soil Moisture */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="moisture"
                  id="moisture"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Soil Moisture"
                />
              </div>
            </div>

            {/* Submit Button for Soil Data */}
            <div className="flex justify-center items-center w-full col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white py-3 px-10 rounded-md hover:bg-purple-600 text-lg"
              >
                Submit Soil Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SoilData;
