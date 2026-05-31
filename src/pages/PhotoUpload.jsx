// src/pages/PhotoUpload.jsx
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTryOn } from "../hooks/useTryOn";
import StepBar from "../components/layout/StepBar";

const SAMPLE_MODEL = "/models/model.png";

export function PhotoUploadPage() {
  const navigate = useNavigate();
  const { uploadedPhoto, setUploadedPhoto } = useTryOn();
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Please upload a JPG or PNG image.");
      return;
    }
    setUploadedPhoto(URL.createObjectURL(file));
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="upload-layout">
      <div className="container">
        <StepBar current={2} />
        <div className="upload-inner">

          <div style={{ textAlign: "center" }}>
            <h1 className="display-sm" style={{ marginBottom: "var(--space-2)" }}>
              Upload your photo
            </h1>
            <p className="caption">A full-body photo on a plain background works best.</p>
          </div>

          {/* Preview or drop zone */}
          {uploadedPhoto ? (
            <div className="upload-preview">
              <img src={uploadedPhoto} alt="Your photo" />
              <div
                className="upload-preview__change"
                onClick={() => inputRef.current.click()}
              >
                <span style={{ color: "#fff", fontSize: "var(--text-sm)", fontWeight: 500 }}>
                  Change photo
                </span>
              </div>
            </div>
          ) : (
            <div
              className="upload-zone"
              onClick={() => inputRef.current.click()}
              onDrop={onDrop}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drag-over"); }}
              onDragLeave={(e) => e.currentTarget.classList.remove("drag-over")}
            >
              <div className="upload-zone__icon">📷</div>
              <div className="upload-zone__title">Drop your photo here</div>
              <p className="upload-zone__sub">or click to browse · JPG, PNG only</p>
              <button
                className="btn btn--outline btn--sm"
                onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}
              >
                Choose file
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {/* Sample model button */}
          <div style={{ textAlign: "center" }}>
            <p className="caption" style={{ marginBottom: "var(--space-3)" }}>
              Don't have a photo handy?
            </p>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => setUploadedPhoto(SAMPLE_MODEL)}
            >
              Use sample model
            </button>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <button
              className="btn btn--outline"
              style={{ flex: 1 }}
              onClick={() => navigate("/products")}
            >
              ← Back
            </button>
            <button
              className="btn btn--primary"
              style={{ flex: 2 }}
              disabled={!uploadedPhoto}
              onClick={() => navigate("/try-on")}
            >
              See try-on →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PhotoUploadPage;