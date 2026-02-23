// cityStore.js → Selected city (NYC / LA / Chicago).
import { create } from "zustand";

const cities = {
  nyc: {
    name: "New York City",
    center: [40.7128, -74.006],
    zoom: 13,
  },
  la: {
    name: "Los Angeles",
    center: [34.0522, -118.2437],
    zoom: 12,
  },
  chicago: {
    name: "Chicago",
    center: [41.8781, -87.6298],
    zoom: 13,
  },
};

const useCityStore = create((set) => ({
  selectedCity: "nyc",
  cities,

  setCity: (cityKey) =>
    set(() => ({
      selectedCity: cityKey,
    })),
}));

export default useCityStore;
