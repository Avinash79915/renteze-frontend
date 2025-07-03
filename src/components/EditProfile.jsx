import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, Phone, MapPin, Calendar, Save, X } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";
import api from "../Pages/utils/axios"; 
import demo from "../assets/Avatar.svg";

const EditProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const email = user?.email;
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    emailNotifications: true
  });

  const [profileImage, setProfileImage] = useState(demo);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return; 

      try {
        const res = await api.get(`/complete-profile/get?testEmail=${email}`);
        const data = res.data.data;
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phoneno || '',
          location: data.location || '',
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : '', // yyyy-mm-dd
          emailNotifications: data.emailNotifications ?? true
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await api.post(`/complete-profile?testEmail=${email}`, {
        name: profileData.name,
        phoneno: profileData.phone,
        location: profileData.location,
        dateOfBirth: profileData.dateOfBirth,
        emailNotifications: profileData.emailNotifications,
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>Please login to edit your profile.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1652A1] to-[#009CDC] h-35 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-30 h-30 rounded-full border-4 border-white object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-[#1652A1] text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-[#1652A1] px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-[#1652A1] text-white px-3 py-2 rounded-md font-medium hover:bg-[#424a79] transition-colors flex items-center gap-1"
                  >
                    <Save size={14} /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-3 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors flex items-center gap-1"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-16 pb-8 md:px-8 px-2">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Preferences</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="font-medium text-gray-800">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={profileData.emailNotifications}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
