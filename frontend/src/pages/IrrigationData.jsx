import React, { useState } from 'react';
import './FarmData.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function IrrigationData() {
  // Irrigation Data State
  const [farmName, setFarmName] = useState('');
  const [cropName, setCropName] = useState('');
  const [irrigationDate, setIrrigationDate] = useState('');
  const [irrigationQuantity, setIrrigationQuantity] = useState('');

  const handleIrrigationSubmit = async (e) => {
    e.preventDefault();

    // Create the irrigation data object
    const irrigationData = {
      farmName,
      cropName,
      irrigationDate,
      irrigationQuantity,
    };

    try {
      // Send the data to the backend using fetch
      const response = await fetch('http://localhost:8080/irrigation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(irrigationData),
      });

      // Parse the JSON response
      const result = await response.json();

      // Handle the success or error response
      if (response.ok) {
        toast.success(result.message);  // Display success message
        // Reset form fields to show placeholders again
        setFarmName('');
        setCropName('');
        setIrrigationDate('');
        setIrrigationQuantity('');
      } else {
        toast.error(result.error);  // Display error message
      }
    } catch (error) {
      console.error('Error submitting irrigation data:', error);
    }
  };

  return (
    <div className="farm-data">
      <ToastContainer autoClose={3000} />
      {/* Irrigation Data Form */}
      <h1 className="bgclr3 h">Irrigation Data</h1>
      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <form
            onSubmit={handleIrrigationSubmit}
            className="grid max-w-4xl gap-4 py-10 px-10 sm:grid-cols-2 bg-white rounded-md mt-16"
          >
            {/* Farm Name */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="farmName"
                  id="farmName"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Farm Name"
                />
              </div>
            </div>

            {/* Crop Name */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="cropName"
                  id="cropName"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Crop Name"
                />
              </div>
            </div>

            {/* Irrigation Date */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="irrigationDate"
                  id="irrigationDate"
                  placeholder="Irrigation Date (YYYY/MM/DD)"
                  pattern="\d{4}/\d{2}/\d{2}"
                  value={irrigationDate}
                  onChange={(e) => setIrrigationDate(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                />
              </div>
            </div>

            {/* Irrigation Quantity */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="irrigationQuantity"
                  id="irrigationQuantity"
                  value={irrigationQuantity}
                  onChange={(e) => setIrrigationQuantity(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Irrigation Quantity (in liters)"
                />
              </div>
            </div>

            {/* Submit Button for Irrigation Data */}
            <div className="flex justify-center items-center w-full col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white py-3 px-10 rounded-md hover:bg-purple-600 text-lg"
              >
                Submit Irrigation Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IrrigationData;
