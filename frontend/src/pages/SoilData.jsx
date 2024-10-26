import React, { useEffect, useState } from "react";
import "./FarmData.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SoilData() {
  // Soil Data State
  const [ph, setPh] = useState("");
  const [soilType, setSoilType] = useState("");
  const [moisture, setMoisture] = useState("");
  const [farmNames, setFarmNames] = useState([]); // To store farm names
  const [farmName, setFarmName] = useState("");
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

  const handleSoilSubmit = async (e) => {
    e.preventDefault();

    // Trim and validate the inputs
    if (!ph.trim() || !soilType.trim() || !moisture.trim() || farmName === "") {
      return toast.error("All fields are required.");
    }

    const soilData = {
      ph: ph.trim(),
      soilType: soilType.trim(),
      moisture: moisture.trim(),
      farmName,
    };
    console.log(soilData);

    await fetch("http://localhost:8080/soildata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(soilData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Reset form fields
          setPh("");
          setSoilType("");
          setMoisture("");
          setFarmName("");

          // Show success toast AFTER reset to avoid interfering with state updates
          toast.success("Soil data submitted successfully!");
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error submitting soil data.");
      });
  };


  return (
    <div className="farm-data">
      <ToastContainer autoClose={3000} />
      <h1 className="bgclr3 h">Soil Data</h1>
      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <form
            onSubmit={handleSoilSubmit}
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

            {/* Soil Type */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="soilType"
                  id="soilType"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Soil Type"
                  required
                />
              </div>
            </div>

            {/* pH Level */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="number"
                  name="ph"
                  id="ph"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="PH Level"
                  required
                />
              </div>
            </div>

            {/* Moisture Content */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="number"
                  name="moisture"
                  id="moisture"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Moisture Content (%)"
                  required
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
