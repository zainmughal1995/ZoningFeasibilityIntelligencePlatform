import { create } from "zustand";

const useFeasibilityStore = create((set) => ({
  result: null,
  error: null,
  highlightedZone: null,

  setResult: (data, zone) =>
    set(() => ({
      result: data,
      highlightedZone: zone,
      error: null,
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
