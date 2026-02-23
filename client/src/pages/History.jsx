import React from "react";
import useFeasibilityStore from "../store/feasibilityStore";

function History() {
  const history = useFeasibilityStore((state) => state.history);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analysis History</h1>
      </div>

      {history.length === 0 && (
        <div className="text-gray-500 text-sm">No analyses yet.</div>
      )}

      {history.length > 0 && (
        <div className="bg-white border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Zone</th>
                <th className="px-6 py-3 text-left">ROI</th>
                <th className="px-6 py-3 text-left">Rating</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{item.date}</td>

                  <td className="px-6 py-4">{item.zone}</td>

                  <td
                    className={`px-6 py-4 font-medium ${
                      parseFloat(item.roi) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.roi}%
                  </td>

                  <td className="px-6 py-4">{item.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;
