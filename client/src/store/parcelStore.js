import { create } from "zustand";

const useParcelStore = create((set) => ({
  parcel: null,

  setParcel: (data) =>
    set(() => ({
      parcel: data,
    })),

  clearParcel: () =>
    set(() => ({
      parcel: null,
    })),
}));

export default useParcelStore;
