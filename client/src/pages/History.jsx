// History.jsx → Past analyses.
import { useState } from "react";
import React from "react";

function History() {
  // Placeholder mock data for now
  const [history] = useState([
    {
      id: 1,
      city: "NYC",
      zone: "R6",
      score: 82,
      status: "Feasible",
      date: "2026-02-23",
    },
    {
      id: 2,
      city: "LA",
      zone: "C2",
      score: 54,
      status: "Moderate",
      date: "2026-02-20",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analysis History</h1>
        <p className="text-sm text-gray-500">
          Previous parcel feasibility checks
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">City</th>
              <th className="text-left px-6 py-3">Zone</th>
              <th className="text-left px-6 py-3">Score</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">{item.city}</td>
                <td className="px-6 py-4">{item.zone}</td>
                <td className="px-6 py-4 font-medium">{item.score}%</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.score > 70
                        ? "bg-green-100 text-green-700"
                        : item.score > 50
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
