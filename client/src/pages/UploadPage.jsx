import React, { useRef } from "react";
import { useAppNavigate } from "../hooks/useAppNavigate.jsx";
import useImageStore, {
  requestStore,
  useLoadStore,
} from "../store/useImageStore.js";
import Selections from "../components/Selections.jsx";
import fileIcon from "../assets/img/file.png";

function Icon() {
  return <img src={fileIcon} />;
}

const RenderUploadContent = ({ preview, onRemove, inputRef }) => {
  if (preview) {
    return (
      <div className="img-wrapper">
        <img src={preview} alt="Preview" />
        <button
          onClick={(e) => onRemove(e, inputRef)}
          className="preview-action preview-remove"
          id="removeImageBtn"
          type="button"
          aria-label="Remove image"
        >
          <div className="icon-preview">x</div>
        </button>
      </div>
    );
  }

  return (
    <>
      <span className="upload-title">
        Drag & Drop your files or <u>Browse</u>
      </span>
      <span className="upload-subtitle">JPG, PNG, WEBP · max 5MB</span>
    </>
  );
};

function UploadPage() {
  const inputRef = useRef(null);
  const { goPromptReview } = useAppNavigate();
  const {
    error,
    handleImage,
    preview,
    handleRemove,
    setSelections,
    selections,
    validateSelections,
    imgFile,
    generatedPrompt,
    setGeneratedPrompt,
  } = useImageStore();
  const { sendReq } = requestStore();
  const { load, setLoad } = useLoadStore();

  const handleContinue = async () => {
    const isValid = validateSelections();

    if (!isValid || load) return;

    const data = await sendReq();

    setGeneratedPrompt(data.result);
    goPromptReview();
  };

  return (
    <section id="screen-upload" className="screen active">
      <div className="panel upload-preferences-panel">
        <div className="upload-preferences-grid">
          <div className="upload-column">
            <h2>Upload reference</h2>
            <p className="muted">Start with one JPG, PNG, or WEBP image.</p>

            <label className="upload-box" id="uploadBox">
              <input
                ref={inputRef}
                onChange={handleImage}
                id="imageInput"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
              />
              <RenderUploadContent
                preview={preview}
                onRemove={handleRemove}
                inputRef={inputRef}
              />
            </label>
            {/* 
            <p id="uploadError" className="error" role="alert"></p> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadPage;
