// src/Pages/Callback.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error("Auth0 callback error:", error);
      } else if (isAuthenticated) {
        navigate("/"); // 👈 where you want to send user after login
      }
    }
  }, [isLoading, error, isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Processing authentication...</p>
    </div>
  );
};

export default CallbackPage;
