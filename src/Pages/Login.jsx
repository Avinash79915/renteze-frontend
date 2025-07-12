import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/white-logo.svg";

function Login() {
  const { loginWithRedirect, isLoading, error } = useAuth0();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center">
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
          <div className="text-white">
            <img src={logo} className="h-20 mb-5" alt="logo" />
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Access your account dashboard and manage your account with ease. Our secure platform ensures your data is protected while providing you with the best user experience.
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
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-100">Log in to your account</p>
              </div>

              <button
                onClick={() => loginWithRedirect()}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Redirecting...
                  </div>
                ) : (
                  "Log in "
                )}
              </button>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-4">
                  <p className="text-red-200 text-sm">{error.message}</p>
                </div>
              )}

              {/* <div className="mt-8 text-center">
                <p className="text-white/70">
                  Don't have an account?{" "}
                  <button
                    onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                    className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Sign up
                  </button>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
