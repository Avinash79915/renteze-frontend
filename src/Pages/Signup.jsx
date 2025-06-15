import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    aadharId: '',
    email: '',
    phonePrimary: '',
    phoneSecondary: '',
    address: '',
    otherDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    console.log('Form Submitted:', formData);
    alert('Super Admin account created.\nWelcome Email sent.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-xl p-8">
        <h2 className="text-2xl font-semibold text-[#1652A1] mb-6 text-center">
          Account Registration (Sign-up)
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:outline-none"
              required
            />
          </div>

          {/* Aadhar ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aadhar ID *
            </label>
            <input
              type="text"
              name="aadharId"
              value={formData.aadharId}
              onChange={handleChange}
              maxLength={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:outline-none"
              required
            />
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:outline-none"
              required
            />
          </div>

          {/* Primary Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Primary) *
            </label>
            <input
              type="tel"
              name="phonePrimary"
              value={formData.phonePrimary}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:outline-none"
              required
            />
          </div>

          {/* Secondary Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secondary Phone Number
            </label>
            <input
              type="tel"
              name="phoneSecondary"
              value={formData.phoneSecondary}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complete Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:outline-none"
              required
            ></textarea>
          </div>

          {/* Other Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Personal/Business Details
            </label>
            <textarea
              name="otherDetails"
              value={formData.otherDetails}
              onChange={handleChange}
              rows="2"
              placeholder="Optional"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#1652A1] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#123d7e] transition-colors"
            >
              Register Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
