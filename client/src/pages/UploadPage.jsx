import React from 'react'
import { useAppNavigate } from '../hooks/useAppNavigate.jsx';
import useImageStore from '../store/useImageStore.js';

function UploadPage() {
  const {goPromptReview} = useAppNavigate();
 const {error,handleImage,preview} = useImageStore();


  return (
    <div>



        <h2>Uploe2e2rfjefj8ejf8ejf</h2>
        <input
            type="file"
            accept="image/*"
            onChange={handleImage}
        />
        {error && <p>{error}wrwrwrwrw</p>}
        {preview && <img src={preview} alt="preview" width="200" />}
        <button onClick={goPromptReview}>next</button>
    </div>
    
  )
}

export default UploadPage



