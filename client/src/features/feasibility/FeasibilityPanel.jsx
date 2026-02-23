import React from "react";
import useFeasibilityStore from "../../store/feasibilityStore";
import useParcelStore from "../../store/parcelStore";
import useFeasibility from "../../hooks/useFeasibility";

function FeasibilityPanel() {
  const { result, error } = useFeasibilityStore();
  const parcel = useParcelStore((state) => state.parcel);
  const { analyze } = useFeasibility();

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-xl font-bold">Financial Feasibility Analysis</h2>
      </div>

      {!parcel && (
        <div className="text-sm text-gray-500">Draw a parcel first.</div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      {result && (
        <div className="space-y-4 text-sm">
          <div>
            <strong>Zone:</strong> {result.zone_code}
          </div>
          <div>
            <strong>Parcel Area:</strong> {result.parcel_area.toLocaleString()}{" "}
            m²
          </div>
          <div>
            <strong>Buildable Area:</strong>{" "}
            {result.buildable_area.toLocaleString()} m²
          </div>
          <div>
            <strong>Revenue:</strong> ${result.revenue.toLocaleString()}
          </div>
          <div>
            <strong>Total Cost:</strong> ${result.total_cost.toLocaleString()}
          </div>
          <div>
            <strong>Profit:</strong> ${result.profit.toLocaleString()}
          </div>

          <div className="text-lg font-bold">
            Base ROI: {result.roi}% ({result.rating})
          </div>

          <div className="mt-4 border-t pt-4 space-y-2">
            <div className="font-semibold">Stress Test</div>
            <div>ROI if Sale Price -10%: {result.roi_revenue_drop}%</div>
            <div>ROI if Construction +10%: {result.roi_cost_rise}%</div>
            <div>Break-even Price: ${result.break_even_price}/m²</div>
          </div>
        </div>
      )}

      <div className="mt-auto">
        <button
          onClick={analyze}
          disabled={!parcel}
          className="w-full py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Run Analysis
        </button>
      </div>
    </div>
  );
}

export default FeasibilityPanel;
