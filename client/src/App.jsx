import { useState } from "react";
// import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Results from "./pages/Results";
import PromptReview from "./pages/PromptReview";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import MainLayout from "./layout/MainLayout";
import Toast from "./components/Toast.jsx";
import useToastStore from "./store/useToastStore.js";

function App() {
  const { showToast, message, type } = useToastStore();

  return (
    <>
      <BrowserRouter>
        <Toast
          message={message}
          type={type}
          onClose={() => showToast("", "success")}
        />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/result" element={<Results />} />
            <Route path="/promptreview" element={<PromptReview />} />
            <Route path="/" element={<UploadPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
