import { devtools } from "zustand/middleware";
import { create } from "zustand";

// console.log(scripts)

const useStore = create(
  devtools((set, get) => ({
    isSuperImageReady: false,

    refs: {},
    addRefs: (refs) => {
      set({ refs: { ...get().refs, ...refs } });
    },

    mapSuperImageRef: {},
    addSuperImageRef: (name, ref) => {
      set({ mapSuperImageRef: { ...get().mapSuperImageRef, [name]: ref } });
    },

    scrollTo: (id, offsetY = 0, options) => {},
  }))
);

export default useStore;
