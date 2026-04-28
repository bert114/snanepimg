import { create } from "zustand";

const usePromptStore = create((set) => ({
  prompt: "",
  isUploaded: false,
  setPrompt: (newPrompt) => set({ prompt: newPrompt }),
  setIsUploaded: (status) => set({ isUploaded: status }),
  handleGenerate: () => {},
}));

export default usePromptStore;
