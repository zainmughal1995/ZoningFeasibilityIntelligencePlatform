import useFeasibilityStore from "../../store/feasibilityStore";
import useParcelStore from "../../store/parcelStore";
import useFeasibility from "../../hooks/useFeasibility";
import React from "react";

function FeasibilityPanel() {
  const { result, loading, error } = useFeasibilityStore();
  const parcelGeometry = useParcelStore((state) => state.parcelGeometry);
  const { analyze } = useFeasibility();

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Feasibility Analysis
        </h2>
        <p className="text-sm text-gray-500">
          Draw a parcel to analyze zoning potential
        </p>
      </div>

      {/* No Parcel */}
      {!parcelGeometry && (
        <div className="bg-gray-50 p-5 rounded-2xl border text-sm text-gray-500">
          No parcel selected.
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-blue-50 p-5 rounded-2xl border text-blue-600 text-sm">
          Running analysis...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 p-5 rounded-2xl border text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-5">
          {/* Score */}
          <div className="bg-gray-50 p-5 rounded-2xl border">
            <h3 className="text-sm text-gray-500 mb-2">Feasibility Score</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-green-600">
                {result.score}%
              </span>
              <span className="text-sm text-gray-500">{result.label}</span>
            </div>
          </div>

          {/* Zoning Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Zoning Details
            </h3>

            <div className="bg-white border rounded-xl p-4">
              <p className="text-sm text-gray-500">Zone Code</p>
              <p className="font-semibold">{result.zone_code}</p>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <p className="text-sm text-gray-500">Max Height</p>
              <p className="font-semibold">{result.max_height} ft</p>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <p className="text-sm text-gray-500">Max FAR</p>
              <p className="font-semibold">{result.max_far}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-auto">
        <button
          onClick={() => analyze()}
          disabled={!parcelGeometry || loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Run Analysis
        </button>
      </div>
    </div>
  );
}

export default FeasibilityPanel;
