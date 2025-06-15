import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const DashboardLayout = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = {
    admin: [
      { label: 'Home', path: '/admin/home' },
      { label: 'Properties', path: '/admin/properties' },
      { label: 'Tenants', path: '/admin/tenants' },
      { label: 'Reports', path: '/admin/reports' },
    ],
    tenant: [
      { label: 'Home', path: '/tenant/home' },
      { label: 'Payments', path: '/tenant/payments' },
      { label: 'Communication', path: '/tenant/communication' },
    ],
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Renteze</h2>
        {navItems[role].map((item) => (
          <div
            key={item.path}
            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded w-1/3"
          />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 font-medium">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
