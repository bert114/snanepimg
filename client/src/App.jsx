import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Results from './pages/Results'
import PromptReview from './pages/PromptReview'
import Home from './pages/Home'
import UploadPage from './pages/UploadPage'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/result" element={<Results />} />
          <Route path="/promptreview" element={<PromptReview />} />
          <Route path="/" element={<UploadPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
