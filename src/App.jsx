import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="flex min-h-screen">

      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
