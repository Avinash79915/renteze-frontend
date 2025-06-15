import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (user?.role === "admin") {
      toast.success("Admin logged in successfully!");
      navigate("/admin/home");
    } else if (user?.role === "tenant") {
      toast.success("Tenant logged in successfully!");
      navigate("/tenant/home");
    } else if (user?.role === "superadmin") {
      toast.success("Super Admin logged in successfully!");
      navigate("/superadmin/home");
    } else if (user) {
      toast.error("Unauthorized role");
    }
  }, [user]);

  // ❌ Show error toast on login failure
  useEffect(() => {
    if (error) {
      toast.error(error || "Login failed");
    }
  }, [error]);

  return (
    <div className="min-h-screen min-w-screen  flex flex-col items-center justify-center bg-[#092446] p-4">
      <div className="max-w-4xl text-white text-center mb-8">
        <h1 className="text-[50px] font-light mb-10 ">Welcome back !</h1>
        <p className="font-light text-md mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0063B0] p-8   w-full max-w-md space-y-10"
      >
        <div>
          <label htmlFor="username" className="block text-white mb-1 font-light text-sm">
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border px-4 py-2 w-full bg-white text-black "
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-white mb-1 font-light text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border px-4 py-2 w-full bg-white text-black"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-[#009CDC] text-white text-xl w-full py-2  hover:[bg-blue-700]"
        >
          Get OTP
        </button>
      </form>
    </div>
  );
}

export default Login;
