import React from 'react';
import './Cards.css'

function Cards() {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5" >
      {/* Card 1 */}
      <div className="w-full lg:max-w-full lg:flex bg1">
        
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal glass">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2 bgclr">
            About Our Agriculture Management System
            </div>
            <p className="text-gray-700 text-base para">
            Agriculture is the backbone of our economy, and at Farm Fusion, we are committed to empowering farmers with innovative tools that simplify their daily operations. Our platform leverages modern technology to predict crop yields, optimize irrigation schedules, and provide real-time weather updates, tailored to individual farm locations.
            </p>
          </div>
         
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-full lg:max-w-full lg:flex bg2">
       
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal glass ">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2 bgclr">
            Our Mission
            </div>
            <p className="text-gray-700 text-base para">
            Our mission is to harness the power of data to enhance agricultural efficiency and sustainability. We aim to provide farmers with precise insights that help them make informed decisions about their crops, irrigation, and overall farm management.
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="w-full lg:max-w-full lg:flex bg3">
       
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal glass">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2 bgclr">
            How It Works
            </div>
            <p className="text-gray-700 text-base para">
            Our system allows farmers to input essential details such as crop type, farm location, and irrigation preferences. Using advanced algorithms and real-time weather data, we deliver customized crop predictions and irrigation schedules. This helps farmers manage their resources efficiently while maximizing productivity.
            </p>
          </div>
          </div>
        </div>
      </div>
  );
}

export default Cards;
