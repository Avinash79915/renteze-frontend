import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignUp from "./Signup";
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import logo from "../assets/white-logo.svg";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [currentView, setCurrentView] = useState("login"); // login, signup, forgot, otp
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await dispatch(login(formData));
      // Move to OTP verification after successful login attempt
      setCurrentView("otp");
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
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
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error || "Login failed");
      setIsLoading(false);
    }
  }, [error]);

  const renderCurrentView = () => {
    switch (currentView) {
      case "signup":
        return <SignUp onBackToLogin={() => setCurrentView("login")} />;
      case "forgot":
        return <ForgotPassword onBackToLogin={() => setCurrentView("login")} />;
      case "otp":
        return (
          <OtpVerification 
            onBackToLogin={() => setCurrentView("login")}
            username={formData.username}
          />
        );
      default:
        return (
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-100">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-white/90 mb-2 font-medium">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your username"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-white/90 mb-2 font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5 text-white/40 hover:text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-white/40 hover:text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-white/20 text-blue-500 focus:ring-blue-400" />
                    <span className="ml-2 text-sm text-white/70">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setCurrentView("forgot")}
                    className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/70">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      
      
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center">
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
        
          <div className="text-white">
          <img src={logo} className="h-20  mb-5 items-center justify-center" alt="logo" />
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Access your dashboard and manage your account with ease. Our secure platform 
              ensures your data is protected while providing you with the best user experience.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-blue-200">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Login
              </div>
              <div className="flex items-center text-blue-200">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
}

export default Login;