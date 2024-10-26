import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {



  
  useEffect(() =>{
    if(!localStorage.getItem("token")) window.location.replace("/");

  },[]);


  return (
    <div className="bg-neutral-100 max-h-screen w-screen flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden ml-7">
        <Navbar />
        <div className="flex-1 p-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
