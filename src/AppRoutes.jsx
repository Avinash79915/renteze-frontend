import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./AppLayout"; // Navbar + Sidebar
import AuthLayout from "./AuthLayout"; // No Navbar/Sidebar
import NavbarOnlyLayout from "./NavbarOnlyLayout"; // Only Navbar

// Pages
import Home from "./Pages/Home";
import LoginOptions from "./Pages/LoginOptions";
import LoginForm from "./Pages/Login";
import AdminDashboard from "./Pages/admin/AdminHome";
import TenantDashboard from "./Pages/tenant/TenantHome";
import SuperAdminDashboard from "./Pages/SuperAdmin/SuperAdmin";
import Signup from "./Pages/Signup";
import OtpVerification from "./Pages/OtpVerification";
import Callback from "./Pages/CallbackPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/callback" element={<Callback />} /> {/* ✅ ADD CALLBACK */}
      </Route>

      {/* Only Navbar routes */}
      <Route element={<NavbarOnlyLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Navbar + Sidebar routes */}
      <Route element={<AppLayout />}>
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/tenant/home" element={<TenantDashboard />} />
        <Route path="/superadmin/home" element={<SuperAdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
