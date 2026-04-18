import { create } from "zustand";

const useImageStore = create((set) => ({
  preview: "",
  error: "",

  handleImage: (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        set({ error: "Upload a valid image.", preview: "" });
        return;
    }

    set({
        error: "",
        preview: URL.createObjectURL(file),
    });

   
  },
}));

export default useImageStore;