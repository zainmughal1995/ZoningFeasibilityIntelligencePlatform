import MapContainer from "../components/map/MapContainer";
import FeasibilityPanel from "../features/feasibility/FeasibilityPanel";
import React from "react";

function Analysis() {
  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Parcel Analysis</h1>
        <p className="text-sm text-gray-500">
          Draw a parcel and evaluate zoning feasibility
        </p>
      </div>

      {/* Split Layout */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Map Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-soft border overflow-hidden">
          <MapContainer />
        </div>

        {/* Side Panel */}
        <div className="w-[420px] bg-white rounded-2xl shadow-soft border overflow-auto">
          <FeasibilityPanel />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
