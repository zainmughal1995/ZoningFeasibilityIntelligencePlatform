// parcelStore.js → Current parcel geometry + metadata.
import { create } from "zustand";

const useParcelStore = create((set) => ({
  parcelGeometry: null,

  setParcel: (geometry) =>
    set(() => ({
      parcelGeometry: geometry,
    })),

  clearParcel: () =>
    set(() => ({
      parcelGeometry: null,
    })),
}));

export default useParcelStore;
