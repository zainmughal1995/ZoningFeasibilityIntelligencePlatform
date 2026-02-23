// useFeasibility.js → Handles analysis request lifecycle.
import useParcelStore from "../store/parcelStore";
import useFeasibilityStore from "../store/feasibilityStore";
import { runFeasibilityAnalysis } from "../services/feasibilityService";

function useFeasibility() {
  const parcelGeometry = useParcelStore((state) => state.parcelGeometry);

  const { setLoading, setResult, setError, clearResult } =
    useFeasibilityStore();

  const analyze = async (city = "nyc") => {
    if (!parcelGeometry) {
      setError("No parcel selected.");
      return;
    }

    try {
      setLoading(true);
      clearResult();

      const data = await runFeasibilityAnalysis(parcelGeometry, city);

      setResult(data);
    } catch (error) {
      setError(error || "Analysis failed.");
    }
  };

  return { analyze };
}

export default useFeasibility;
