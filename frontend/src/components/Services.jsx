import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";

function Services() {
  return (
    <div className="services">
      <h1 className="bgclr">SERVICES</h1>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="w-full lg:max-w-full lg:flex ser1">
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal glass">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2 bgclr2">
                Crop Prediction
              </div>
              <p className="text-gray-700 text-base para">
                Accurately predicting crop performance can be challenging, but
                our system makes it easier. By analyzing key data points such as
                nitrogen levels, phosphorus, potassium, temperature, humidity,
                pH levels, and rainfall, we deliver reliable crop forecasts.
                This helps farmers make informed decisions, optimize planting
                schedules, allocate resources efficiently, and ultimately
                increase profitability while reducing waste.{" "}
              </p>
            </div>
            <Link to="/CropRecommendation">
              <button className="button ">Explore More ⪼ </button>
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full lg:max-w-full lg:flex ser2">
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal glass ">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2 bgclr2">
                Irrigation Schedule
              </div>
              <p className="text-gray-700 text-base para">
                Weather is a critical factor in farming, and having access to
                real-time updates can make all the difference. Our platform
                provides accurate, location-specific weather data, including
                temperature, rainfall, humidity, and wind speed. With timely
                alerts and forecasts, farmers can take proactive steps to
                protect their crops, adjust their irrigation schedules, and make
                informed decisions about when to plant, spray, or harvest.
              </p>
            </div>
            <Link to="/layout/IrrigationData">
              <button className="button ">Explore More ⪼</button>
            </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full lg:max-w-full lg:flex ser3">
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal glass">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2 bgclr2">
                Weather Data
              </div>
              <p className="text-gray-700 text-base para">
                Effective water management is essential for maximizing crop
                health and yield. Our system generates customized irrigation
                schedules based on a combination of factors, including weather
                conditions, soil moisture, and crop type. By delivering precise
                water recommendations, we help farmers ensure that their crops
                receive the right amount of water at the right time, promoting
                healthy growth while conserving water and reducing costs.
              </p>
            </div>
            <Link to="/layout/WeatherData">
              <button className="button ">Explore More ⪼</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
