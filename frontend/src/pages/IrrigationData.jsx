import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FarmData.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IrrigationData() {
  // Irrigation Data State
  const [farmNames, setFarmNames] = useState([]); // To store farm names
  const [farmName, setFarmName] = useState("");
  const [cropName, setCropName] = useState("");
  const [irrigationDate, setIrrigationDate] = useState("");
  const [irrigationQuantity, setIrrigationQuantity] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFarmNames = async () => {
      try {
        const response = await axios.get("http://localhost:8080/farms/names"); // Adjusted endpoint for fetching farm names
        setFarmNames(response.data); // Assuming the response data is an array of farm names
      } catch (error) {
        console.error("Error fetching farm names:", error);
      }
    };

    fetchFarmNames();
  }, []);

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
      const response = await fetch("http://localhost:8080/irrigation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(irrigationData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        // Reset form fields
        setFarmName("");
        setCropName("");
        setIrrigationDate("");
        setIrrigationQuantity("");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error submitting irrigation data:", error);
    }
  };

  return (
    <div className="farm-data">
      <ToastContainer autoClose={3000} />
      <h1 className="bgclr3 h">Irrigation Data</h1>
      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <form
            onSubmit={handleIrrigationSubmit}
            className="grid max-w-4xl gap-4 py-10 px-10 sm:grid-cols-2 bg-white rounded-md mt-16"
          >
            {/* Farm Name Dropdown */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <select
                  name="farmName"
                  id="farmName"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className={`block w-full p-0 text-base ${
                    farmName === "" ? "text-gray-400" : "text-gray-900"
                  } placeholder-gray-400 focus:outline-none focus:border-none`}
                  required
                >
                  <option value="" disabled className="text-gray-400">
                    Farm Name
                  </option>
                  {/* Placeholder option */}
                  {farmNames.length > 0 ? (
                    farmNames.map((farm, index) => (
                      <option key={index} value={farm}>
                        {farm}
                      </option>
                    ))
                  ) : (
                    <option value="">No farms available</option> // Handle the case when there are no farms
                  )}
                </select>
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
                  required
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
                  type="number"
                  name="irrigationQuantity"
                  id="irrigationQuantity"
                  value={irrigationQuantity}
                  onChange={(e) => setIrrigationQuantity(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Irrigation Quantity (in liters)"
                  required
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
