import { create } from "zustand";
import { createImagePreviewState, isValidImageFile } from "../helper/util";

const useImageStore = create((set, get) => ({
  preview: "",
  error: "",

  handleImage: (e) => {
    const file = e.target.files[0];
    const {valid,error} = isValidImageFile(file);


    console.log(error);

    if (!valid) {
      set({error, preview: ""});
      return;
    }
    
    set(createImagePreviewState(file));

    console.log(createImagePreviewState(file));
  },
}));

export default useImageStore;