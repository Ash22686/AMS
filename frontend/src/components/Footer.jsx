import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-black sm:mx-auto" />
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Farm Fusion
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            
            {/* Pages Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Pages
              </h2>
              <ul className="text-gray-500">
                <li className="mb-4">
                  <Link to="/home" className="hover:underline">Home</Link>
                </li>
                <li className="mb-4">
                  <Link to="/about" className="hover:underline">About</Link>
                </li>
                <li className="mb-4">
                  <Link to="/faqs" className="hover:underline">FAQs</Link>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Services
              </h2>
              <ul className="text-gray-500">
                <li className="mb-4">
                  <Link to="/CropRecommendation" className="hover:underline">Crop Recommendation</Link>
                </li>
                <li className="mb-4">
                  <Link to="/layout/WeatherData" className="hover:underline">Weather Data</Link>
                </li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Contact Us
              </h2>
              <ul className="text-gray-500">
                <li className="mb-4">
                  <Link to="..." className="hover:underline">Email: info@farmfusion.com</Link>
                </li>
                <li>
                  <Link to="..." className="hover:underline">Phone: +123 456 7890</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-black sm:mx-auto" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex mt-4 gap-4 sm:justify-center sm:mt-0 w-screen">
            <p >&copy; 2024 Farm Fusion | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
