import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";

// Pages
import Home from "./Pages/Home";
import LoginOptions from "./Pages/LoginOptions";
import LoginForm from "./Pages/Login";
import AdminDashboard from "./Pages/admin/AdminHome";
import TenantDashboard from "./Pages/tenant/TenantHome";
import SuperAdminDashboard from "./Pages/SuperAdmin/SuperAdmin";
import Signup from "./Pages/Signup";
import OtpVerification from "./Pages/OtpVerification";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes without sidebar/navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginOptions />} />
        <Route path="/login/:role" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpVerification />} />
      </Route>

      {/* Routes with sidebar/navbar */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/tenant/home" element={<TenantDashboard />} />
        <Route path="/superadmin/home" element={<SuperAdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;