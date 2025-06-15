// src/Pages/Home.jsx
import React from 'react';
import PropertyList from '../components/PropertyCard';

const Home = () => {
  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-semibold mb-4">All Properties</h1>
      <PropertyList />
    </div>
  );
};

export default Home;
