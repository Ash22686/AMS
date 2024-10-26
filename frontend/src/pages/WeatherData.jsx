import { useState } from "react";

const api = {
  key: "c46a25b8f0825bbda72384de05ee06ed",
  base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherData() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  // Search button pressed. Make a fetch call to Open Weather Map API.
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="weather-data">
      {/* Weather Data Form */}
      <h1 className="bgclr3 h text-center">Weather</h1>
      <div className="mt-8 w-full flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <div className="grid max-w-4xl gap-4 py-10 px-10 sm:grid-cols-2 bg-white rounded-md">
            <div className="flex justify-center w-full ml-48">
              {/* Search Box */}
              <div className="grid mb-4">
                <div className="bg-white flex min-h-[65px] justify-center items-center w-80 rounded-md border border-gray-300 px-3">
                  <input
                    type="text"
                    placeholder="Enter Location"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full p-0 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-none"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="ml-4 flex justify-center items-center mb-4">
                <button
                  onClick={searchPressed}
                  className="bg-purple-500 text-white py-3 px-10 rounded-md hover:bg-purple-600 text-lg"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Weather Data Display */}
            {typeof weather.main !== "undefined" && (
              <div className="col-span-2 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* City Name */}
                  <div className="grid mb-4 ">
                    <div className="bg-white flex min-h-[65px] justify-center gap-10 rounded-md border border-gray-300 px-3 py-5">
                      <p className="text-gray-500">Location:</p>
                      <p>{weather.name}</p>
                    </div>
                  </div>

                    {/* Weather Main */}
                    <div className="grid mb-4">
                    <div className="bg-white flex min-h-[65px] justify-center gap-10 rounded-md border border-gray-300 px-3 py-5">
                      <p className="text-gray-500">Weather:</p>
                      <p>{weather.weather[0].main}</p>
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="grid mb-4">
                    <div className="bg-white flex min-h-[65px] justify-center gap-10 rounded-md border border-gray-300 px-3 py-5">
                      <p className="text-gray-500">Temperature:</p>
                      <p>{weather.main.temp}°C</p>
                    </div>
                  </div>

                  {/* Humidity */}
                  <div className="grid mb-4">
                    <div className="bg-white flex min-h-[65px] justify-center gap-10 rounded-md border border-gray-300 px-3 py-5">
                      <p className="text-gray-500">Humidity:</p>
                      <p>{weather.main.humidity}%</p>
                    </div>
                  </div>

                  
                  {/* Windspeed */}
                  <div className="grid mb-4">
                    <div className="bg-white flex min-h-[65px] justify-center gap-10 rounded-md border border-gray-300 px-3 py-5">
                      <p className="text-gray-500">Wind Speed:</p>
                      <p>{weather.wind.speed} m/s</p>
                    </div>
                  </div>

                
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherData;
