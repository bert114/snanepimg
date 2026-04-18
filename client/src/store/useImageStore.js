import { create } from "zustand";
import { createImagePreviewState, isSelectionValid, isValidImageFile } from "../helper/util";
import { IMAGE_ERRORS } from "../helper/helper";


export const useLoadStore = create((set, get) => ({
  load: false,

  setLoad: (bool) => {
    set({load: bool});
  }

}));

const useImageStore = create((set, get) => ({
  preview: "",
  error: "",
  selections: {
    noText: false,
    plainBackground: false,
    color: "",
    aspectRatio: "",
  },
  imgFile: "",


  setSelections: (value) => {
    set((state) => ({
      selections: {
        ...state.selections,
        ...value
      }
    }))
  },

  handleImage: (e) => {
    const file = e.target.files[0];
    const {valid, error} = isValidImageFile(file);

    if (!valid) {
      set({error, preview: ""});
      return;
    }
    
    
    set(createImagePreviewState(file));
  },

  handleRemove: (e) => {
    e.stopPropagation();
    set({preview: ""});
  },


  validateSelections: () => {
    const { selections } = get();

    if (!selections.aspectRatio) {
      set({ error: "Select aspect ratio" });
      return false;
    }

    if (!selections.color) {
      set({ error: "Select color" });
      return false;
    }

    set({ error: "" });
    return true;
  },

  validateSelections: () => {
    const { selections,preview } = get();
    const { valid, error } = isSelectionValid(selections);

    
    if (!preview) {
      set({ error: IMAGE_ERRORS.noFile });
      return false;
    }

    if (!valid) {
      set({ error });
      return false;
    }

    return true;
  },



}));

export default useImageStore;