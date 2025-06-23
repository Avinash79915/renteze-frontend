import React, { useState } from 'react';
import { Trash2, CreditCard, Home, Settings, Calendar, Filter, RotateCcw, X } from 'lucide-react';

const History = () => {
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      type: 'payment',
      title: 'Monthly Rent Payment',
      description: 'Rent payment for apartment 2A',
      amount: '$1,200',
      date: '2025-06-20',
      status: 'completed'
    },
    {
      id: 2,
      type: 'property',
      title: 'Property Inspection',
      description: 'Annual inspection completed',
      date: '2025-06-18',
      status: 'completed'
    },
    {
      id: 3,
      type: 'admin',
      title: 'Profile Updated',
      description: 'Contact information changed',
      date: '2025-06-15',
      status: 'completed'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Security Deposit',
      description: 'Security deposit refund processed',
      amount: '$500',
      date: '2025-06-12',
      status: 'pending'
    },
    {
      id: 5,
      type: 'property',
      title: 'Maintenance Request',
      description: 'Plumbing repair completed',
      date: '2025-06-10',
      status: 'completed'
    },
    {
      id: 6,
      type: 'admin',
      title: 'Password Changed',
      description: 'Account password updated',
      date: '2025-06-08',
      status: 'completed'
    }
  ]);

  const [deletedItems, setDeletedItems] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [showDeleted, setShowDeleted] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="text-[#1652A1]" size={20} />;
      case 'property':
        return <Home className="text-[#1652A1]" size={20} />;
      case 'admin':
        return <Settings className="text-[#1652A1]" size={20} />;
      default:
        return <Calendar className="text-[#1652A1]" size={20} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'property':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const deleteItem = (id) => {
    const itemToDelete = historyData.find(item => item.id === id);
    if (itemToDelete) {
      setDeletedItems([...deletedItems, { ...itemToDelete, deletedAt: new Date().toISOString() }]);
      setHistoryData(historyData.filter(item => item.id !== id));
    }
  };

  const retrieveItem = (id) => {
    const itemToRetrieve = deletedItems.find(item => item.id === id);
    if (itemToRetrieve) {
      const { deletedAt, ...originalItem } = itemToRetrieve;
      setHistoryData([...historyData, originalItem]);
      setDeletedItems(deletedItems.filter(item => item.id !== id));
    }
  };

  const permanentlyDelete = (id) => {
    setDeletedItems(deletedItems.filter(item => item.id !== id));
  };

  const filteredData = filterType === 'all' 
    ? historyData 
    : historyData.filter(item => item.type === filterType);

  const isWithin30Days = (dateString) => {
    const itemDate = new Date(dateString);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return itemDate >= thirtyDaysAgo;
  };

  const recent30DaysData = filteredData.filter(item => isWithin30Days(item.date));

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className=" mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Activity History</h1>
          <p className="text-gray-600">View your recent activities and manage your history</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Filter */}
            <div className="flex items-center gap-3">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-[#1652A1] focus:border-transparent"
              >
                <option value="all">All Activities</option>
                <option value="payment">Payments</option>
                <option value="property">Property</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Toggle View */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleted(false)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  !showDeleted 
                    ? 'bg-[#1652A1] text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Active ({recent30DaysData.length})
              </button>
              <button
                onClick={() => setShowDeleted(true)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  showDeleted 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Deleted ({deletedItems.length})
              </button>
            </div>
          </div>
        </div>

        {/* History List */}
        {!showDeleted ? (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-[#1652A1] rounded-lg p-3 mb-4">
              <p className="text-[#1652A1] text-sm font-medium">
                Showing activities from the last 30 days
              </p>
            </div>

            {recent30DaysData.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Recent Activity</h3>
                <p className="text-gray-600">No activities found in the last 30 days.</p>
              </div>
            ) : (
              recent30DaysData.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{formatDate(item.date)}</span>
                          {item.amount && <span className="font-medium text-[#1652A1]">{item.amount}</span>}
                          
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Deleted Items Section
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-800 text-sm font-medium">
                🗑️ Deleted items - You can retrieve or permanently delete them
              </p>
            </div>

            {deletedItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Trash2 className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Deleted Items</h3>
                <p className="text-gray-600">No deleted activities to show.</p>
              </div>
            ) : (
              deletedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-red-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg opacity-60">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-600">{item.title}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            deleted
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Original: {formatDate(item.date)}</span>
                          <span>Deleted: {formatDate(item.deletedAt)}</span>
                          {item.amount && <span className="font-medium">{item.amount}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => retrieveItem(item.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Retrieve"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        onClick={() => permanentlyDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Permanently"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;