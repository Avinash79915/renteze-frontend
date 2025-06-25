import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const NavbarOnlyLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-0 px-4"> 
        <Outlet />
      </div>
    </>
  );
};

export default NavbarOnlyLayout;
