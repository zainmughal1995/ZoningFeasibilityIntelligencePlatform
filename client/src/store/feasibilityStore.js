// feasibilityStore.js → Result returned from backend.
import { create } from "zustand";

const useFeasibilityStore = create((set) => ({
  result: null,
  loading: false,
  error: null,

  setLoading: (value) =>
    set(() => ({
      loading: value,
      error: null,
    })),

  setResult: (data) =>
    set(() => ({
      result: data,
      loading: false,
      error: null,
    })),

  setError: (message) =>
    set(() => ({
      error: message,
      loading: false,
    })),

  clearResult: () =>
    set(() => ({
      result: null,
      loading: false,
      error: null,
    })),
}));

export default useFeasibilityStore;
