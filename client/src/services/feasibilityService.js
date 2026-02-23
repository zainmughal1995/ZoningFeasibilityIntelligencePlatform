// feasibilityService.js → Backend call for analysis.
import apiClient from "./apiClient";

/**
 * Sends parcel geometry to backend for feasibility analysis
 * @param {Object} geometry - GeoJSON geometry from map draw
 * @param {String} city - Selected city (optional for now)
 */
export const runFeasibilityAnalysis = async (geometry, city = "nyc") => {
  try {
    const response = await apiClient.post("/feasibility/analyze/", {
      geometry,
      city,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Feasibility analysis failed.";
  }
};
