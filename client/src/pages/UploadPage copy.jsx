import React from 'react'
import { useAppNavigate } from '../hooks/useAppNavigate.jsx';
import useImageStore, { requestStore, useLoadStore } from '../store/useImageStore.js';
import Selections from '../components/Selections.jsx';
import fileIcon from '../assets/img/file.png';


function Icon() {
  return (
    <img src={fileIcon}/>
  )
}


function UploadPage() {
  const {goPromptReview} = useAppNavigate();
  const {error,handleImage,preview, handleRemove, setSelections,selections,validateSelections, imgFile, generatedPrompt, setGeneratedPrompt } = useImageStore();
  const {sendReq} = requestStore();
  const {load,setLoad} = useLoadStore();

  const handleContinue = async () => {
    
    const isValid = validateSelections();

    if (!isValid || load) return;

    const data = await sendReq();

    setGeneratedPrompt(data.result);





    goPromptReview();
  };

  return (

    <div>
      <label className="custum-file-upload" htmlFor="file">
      <div className="icon">

      <div className="preview-img">
        {preview ? <img className='show' src={preview} alt="" /> : <Icon/>}
        <button className="close" onClick={handleRemove}>x</button>
      </div>
        
      
      </div>
      <div className="text">
        <span>Click to upload image</span>
        </div>
        <input type="file" id="file" onChange={handleImage} accept=".jpg,.jpeg,.png,.webp"/>
      </label>

      {error && <p>{error}</p>}


      <Selections/>

      <button disabled={!preview}  onClick={handleContinue}>{load ? "Generating Prompt....." : "Generate Prompt"}</button>
      
    </div>
  )
}

export default UploadPage



