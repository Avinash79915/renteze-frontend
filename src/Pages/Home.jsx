import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center  justify-center">
      {/* Hero Section */}
      <div className="flex flex-row items-center justify-center px-1 py-15 lg:py-24 text-center max-w-7xl">
        <div className=" mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-[#004C86]">Renteze</span>
          </h1>
          
          <p className="text-md md:text-md text-gray-600 mb-12 leading-relaxed  text-center ">
            Comprehensive rental property management platform designed to simplify, 
            automate, and streamline rental operations
          </p>

          <div className="bg-white  rounded-2xl p-3 mb-12 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Built for Everyone in the Rental Ecosystem
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left  ">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Landlords</h3>
                <p className="text-gray-600 text-sm">Manage multiple properties and units with ease</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 border border-green-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Managers</h3>
                <p className="text-gray-600 text-sm">Streamline operations with powerful admin tools</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tenants</h3>
                <p className="text-gray-600 text-sm">Access your rental information and make payments</p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Management</h3>
              <p className="text-gray-600 text-sm">Complete payment tracking and contract management</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation</h3>
              <p className="text-gray-600 text-sm">Streamline repetitive tasks and workflows</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-gray-600 text-sm">Role-based permissions and data security</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Visibility</h3>
              <p className="text-gray-600 text-sm">End-to-end operational insights and reporting</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#004C86] to-[#1652A1] rounded-2xl p-3 border shadow-xl">
            <h2 className="text-xl md:text-3xl font-light text-white mb-4">
              Ready to Transform Your Rental Management?
            </h2>
            <p className="text-blue-100 mb-8 text-md">
              Join thousands of property managers who trust Renteze for their rental operations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-all duration-200 font-light text-md shadow-lg"
          >
            Sign Up Free
          </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200 font-light text-md ">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;