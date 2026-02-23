import { create } from "zustand";

const useFeasibilityStore = create((set) => ({
  result: null,
  error: null,
  highlightedZone: null,
  history: [],

  setResult: (data, zone) =>
    set((state) => ({
      result: data,
      highlightedZone: zone,
      error: null,
      history: [
        {
          id: Date.now(),
          date: new Date().toLocaleString(),
          zone: data.zone_code,
          roi: data.roi, // ✅ save ROI
          rating: data.rating, // ✅ save rating
        },
        ...state.history,
      ],
    })),

  setError: (message) =>
    set(() => ({
      error: message,
      result: null,
      highlightedZone: null,
    })),

  clearResult: () =>
    set(() => ({
      result: null,
      highlightedZone: null,
      error: null,
    })),
}));

export default useFeasibilityStore;
