import React, { useState } from 'react';
import './FarmData.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  // Personal Data State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState('');
  const token = localStorage.getItem("token");

  // Personal Data Submission
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      name,
      email,
      mobileNumber,
      location,
    };

    try {
      // Send a POST request to the backend to save profile data
      const response = await fetch("http://localhost:8080/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      console.log(response.data); // Handle success
      toast.success("Profile submitted successfully!");

      // Reset form fields to show placeholders again
      setName('');
      setEmail('');
      setMobileNumber('');
      setLocation('');
    } catch (error) {
      console.error("There was an error submitting the profile:", error.response.data);
      toast.error("Error submitting profile!");
    }
  };

  return (
    <div className="farm-data">
      {/* Toast Container */}
      <ToastContainer autoClose = {3000}/> 

      {/* Personal Data Form */}
      <h1 className="bgclr3 h">Personal Data</h1>
      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <form
            onSubmit={handlePersonalSubmit}
            className="grid max-w-4xl gap-4 py-10 px-10 sm:grid-cols-2 bg-white rounded-md mt-16"
          >
            {/* Name */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Mobile Number"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid mb-4">
              <div className="bg-white flex min-h-[65px] justify-center rounded-md border border-gray-300 px-3">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  placeholder="Address"
                />
              </div>
            </div>

            {/* Submit Button for Personal Data */}
            <div className="flex justify-center items-center w-full col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white py-3 px-10 rounded-md hover:bg-purple-600 text-lg"
              >
                Submit Personal Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
