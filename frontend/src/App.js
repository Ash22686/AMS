import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Layout from "./pages/Layout";
import CropRecommendation from "./pages/CropRecommendation";
import Profile from "./pages/Profile";
import FarmData from "./pages/FarmData";
import IrrigationData from "./pages/IrrigationData";
import SoilData from "./pages/SoilData";
import WeatherData from "./pages/WeatherData";
import ViewData from "./pages/ViewData";
import ViewFarm from "./pages/ViewFarm";
import ViewProfile from "./pages/ViewProfile";
import ViewSoil from "./pages/ViewSoil";
import ViewIrrigation from "./pages/ViewIrrigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    checkAuthentication();
  }, []);



  const handleLogin = (token) => {
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home onLogout={handleLogout} />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/CropRecommendation" element={<CropRecommendation />} />

        <Route path="/layout" element={<Layout />}>
          <Route index element={<Profile />} />{" "}
          {/* Set Profile as the index route */}
          <Route path="Profile" element={<Profile />} />
          <Route path="IrrigationData" element={<IrrigationData />} />
          <Route path="SoilData" element={<SoilData />} />
          <Route path="WeatherData" element={<WeatherData />} />
          <Route path="farmdata" element={<FarmData />} />
          <Route path="ViewData" element={<ViewData />} />
          <Route path="ViewProfile" element={<ViewProfile />} />
          <Route path="ViewIrrigation" element={<ViewIrrigation />} />
          <Route path="ViewSoil" element={<ViewSoil />} />
          <Route path="ViewFarm" element={<ViewFarm />} />
          {/* Add other nested routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
