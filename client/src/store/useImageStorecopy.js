import { create } from "zustand";
import {
  getImage,
  isValidFileSize,
  isValidImage,
  toast,
} from "../helper/helperImage.js";
import useToastStore from "./useToastStore.js";

const useImageStore1 = create((set, get) => ({
  img: "",

  handleImage1: async (e) => {
    const img = getImage(e);
    const isValid = isValidImage(img) || isValidFileSize(img);

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("image", img);

    console.log("FormData:", formData.get("image"));

    const response = await fetch("http://localhost:5000/api/user/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    toast("Image uploaded successfully", "success");
  },
}));

export default useImageStore1;
