import React, { use, useRef } from "react";
import { useAppNavigate } from "../hooks/useAppNavigate.jsx";
import useImageStore, { requestStore } from "../store/useImageStore.js";
import Selections from "../components/Selections.jsx";
import fileIcon from "../assets/img/file.png";
import { useEffect } from "react";
import { useState } from "react";
import useImageStore1 from "../store/useImageStorecopy.js";
import { preventDropDefault } from "../helper/helperImage.js";
import Loaders from "../components/loaders.jsx";
import useLoadStore from "../store/useLoadStore.js";

function Icon() {
  return <img src={fileIcon} />;
}

const RenderUploadContent = ({ img, onRemove, inputRef }) => {
  const { load } = useLoadStore();
  if (load) {
    return <Loaders />;
  }

  if (img) {
    return (
      <div className="img-wrapper">
        <img src={img} alt="Preview" />
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
  const [imageUrl, setImageUrl] = useState("");
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

  const { img } = useImageStore1();

  const { handleImage1 } = useImageStore1();

  const { sendReq } = requestStore();
  const { load, setLoad } = useLoadStore();

  const handleContinue = async () => {
    const isValid = validateSelections();

    if (!isValid || load) return;

    const data = await sendReq();

    setGeneratedPrompt(data.result);
    goPromptReview();
  };

  const handleGenerate = async (prompt) => {
    const response = await fetch(
      `https://lami-si-penans.onrender.com/api/images/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "img4",
          prompt,
          n: 1,
          size: "1024x1024",
          response_format: "url",
        }),
      },
    );

    const data = await response.json();
    console.log(data);
    setImageUrl(data?.data?.data?.[0]?.url || "");
  };

  const test = async () => {
    const formData = new FormData();
    formData.append("image", inputRef.current.files[0]);

    const res = await fetch("http://localhost:5000/api/vision/describe", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    await handleGenerate(data.description);

    console.log(data);

    return data;
  };

  return (
    <section
      onDrop={(e) => handleImage1(e)}
      onDragOver={(e) => e.preventDefault()}
      id="screen-upload"
      className="screen active"
    >
      <div className="panel upload-preferences-panel">
        <div className="upload-preferences-grid">
          <div className="upload-column">
            <h2>Upload reference</h2>
            <p className="muted">Start with one JPG, PNG, or WEBP image.</p>

            <label className="upload-box" id="uploadBox">
              <input
                ref={inputRef}
                onChange={handleImage1}
                id="imageInput"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
              />
              <RenderUploadContent
                img={img}
                onRemove={handleRemove}
                inputRef={inputRef}
              />
            </label>
            {/* 
            <p id="uploadError" className="error" role="alert"></p> */}

            {/* <button onClick={test}>Send</button> */}
          </div>
        </div>
      </div>
      <img src={img} alt="Preview" data-image="preview" />
      {/* <img src={imageUrl} alt="Generated" /> */}
    </section>
  );
}

export default UploadPage;
