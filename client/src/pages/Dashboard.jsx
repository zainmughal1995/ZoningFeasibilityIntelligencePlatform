import React from "react";
import useFeasibilityStore from "../store/feasibilityStore";

function Dashboard() {
  const history = useFeasibilityStore((state) => state.history);

  const totalAnalyses = history.length;

  const feasibleProjects = history.filter((item) =>
    item.score ? item.score > 0 : item.roi && parseFloat(item.roi) > 0,
  ).length;

  const rejectedProjects = totalAnalyses - feasibleProjects;

  const recent = history.slice(0, 5);

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
          <p className="text-3xl font-bold mt-2">{totalAnalyses}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">Profitable Projects</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {feasibleProjects}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">Non-Viable Projects</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">
            {rejectedProjects}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>

        {recent.length === 0 && (
          <p className="text-sm text-gray-500">No analyses yet.</p>
        )}

        {recent.length > 0 && (
          <div className="space-y-3 text-sm">
            {recent.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <span className="font-medium">Zone {item.zone}</span>
                  <div className="text-gray-500 text-xs">{item.date}</div>
                </div>

                <div
                  className={
                    parseFloat(item.roi) > 0
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  ROI {item.roi}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
