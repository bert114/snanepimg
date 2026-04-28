import { create } from "zustand";
import {
  getImage,
  isValidFileSize,
  isValidImage,
  toast,
} from "../helper/helperImage.js";
import useToastStore from "./useToastStore.js";
import { getUrl, uploadImage } from "../helper/helper.js";
import { waitforElement } from "../helper/load.js";

const useImageStore1 = create((set, get) => ({
  img: "",

  handleImage1: async (e) => {
    const img = getImage(e);

    const isValid = isValidImage(img) || isValidFileSize(img);

    if (!isValid) {
      toast("Image invalid", "error");
      return;
    }

    const data = await uploadImage(img);
    const url = getUrl(data);

    set({ img: url });

    await waitforElement('[data-image="preview"]');
    toast("Image uploaded successfully", "success");
  },
}));

export default useImageStore1;
