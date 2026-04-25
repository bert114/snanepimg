import { useState } from "react";
// import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Results from "./pages/Results";
import PromptReview from "./pages/PromptReview";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
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
