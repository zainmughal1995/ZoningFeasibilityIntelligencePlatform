// Dashboard.jsx → Overview + stats.
import React from "react";
function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of zoning feasibility analyses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">Total Analyses</h3>
          <p className="text-3xl font-bold mt-2">128</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">Feasible Projects</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">87</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">Rejected Projects</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">41</p>
        </div>
      </div>

      {/* Placeholder Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Recent Activity
        </h3>
        <p className="text-sm text-gray-500">
          Recent parcel feasibility checks will appear here.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
