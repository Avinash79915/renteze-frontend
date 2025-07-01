import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostLoginRedirect = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/home", { replace: true });
    } else if (user?.role === "tenant") {
      navigate("/tenant/home", { replace: true });
    } else if (user?.role === "superadmin") {
      navigate("/superadmin/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return <div className="flex justify-center items-center min-h-screen text-xl">Redirecting...</div>;
};

export default PostLoginRedirect;
