// src/pages/TryOnResult.jsx
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTryOn } from "../hooks/useTryOn";
import TryOnCanvas from "../components/tryon/TryOnCanvas";
import StepBar from "../components/layout/StepBar";

export function TryOnResultPage() {
  const navigate = useNavigate();
  const { uploadedPhoto, selectedProducts, setSelectedProducts } = useTryOn();

  // ✅ canvasRef lives here and gets passed down to TryOnCanvas
  // so the download button can access the actual canvas element
  const canvasRef = useRef(null);

  // ── Download handler — uses the forwarded ref, not querySelector ──
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("Canvas not ready yet. Please wait for the render to finish.");
      return;
    }
    const link = document.createElement("a");
    link.download = "my-look.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // ── Guard: missing photo ──────────────────────────────────────
  if (!uploadedPhoto) {
    return (
      <div className="result-layout">
        <div className="container">
          <StepBar current={3} />
          <div style={{
            textAlign: "center",
            padding: "var(--space-20) var(--space-6)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "var(--space-5)"
          }}>
            <div style={{ fontSize: 48 }}>📷</div>
            <h2 className="display-sm">No photo uploaded</h2>
            <p className="caption">You need to upload a photo before seeing the try-on result.</p>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/upload")}
            >
              Upload a photo →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Guard: no products selected ───────────────────────────────
  if (!selectedProducts || selectedProducts.length === 0) {
    return (
      <div className="result-layout">
        <div className="container">
          <StepBar current={3} />
          <div style={{
            textAlign: "center",
            padding: "var(--space-20) var(--space-6)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "var(--space-5)"
          }}>
            <div style={{ fontSize: 48 }}>👗</div>
            <h2 className="display-sm">No products selected</h2>
            <p className="caption">Go back and select at least one product to try on.</p>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/products")}
            >
              ← Select products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────
  return (
    <div className="result-layout">
      <div className="container">
        <StepBar current={3} />

        <div style={{ marginBottom: "var(--space-6)" }}>
          <h1 className="display-sm" style={{ marginBottom: "var(--space-1)" }}>
            Your look
          </h1>
          <p className="caption">
            Here's how you'd look wearing your selected pieces.
          </p>
        </div>

        <div className="result-grid">

          {/* ── Canvas col ── */}
          <div>
            {/* 
              ✅ canvasRef is forwarded into TryOnCanvas.
              TryOnCanvas must accept and attach it to <canvas ref={canvasRef}>
            */}
            <TryOnCanvas
              modelPhoto={uploadedPhoto}
              products={selectedProducts}
              canvasRef={canvasRef}
            />
          </div>

          {/* ── Sidebar ── */}
          <div className="result-actions-panel">

            {/* Items worn */}
            <div className="card">
              <div className="card__body">
                <div className="label" style={{ marginBottom: "var(--space-4)" }}>
                  Wearing now
                </div>
                {selectedProducts.map(p => (
                  <div key={p.id} className="selected-item">
                    <img
                      className="selected-item__img"
                      src={p.image}
                      alt={p.name}
                    />
                    <div>
                      <div style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>
                        {p.name}
                      </div>
                      <div style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--c-gold-dark)",
                        fontWeight: 500
                      }}>
                        ₹{p.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <div className="card__body">
                <div className="label" style={{ marginBottom: "var(--space-4)" }}>
                  Actions
                </div>

                {/* ✅ Uses handleDownload which reads canvasRef.current */}
                <button
                  className="btn btn--primary btn--full"
                  onClick={handleDownload}
                >
                  ↓ Download look
                </button>

                <button
                  className="btn btn--outline btn--full"
                  onClick={() => {
                    setSelectedProducts([]);
                    navigate("/products");
                  }}
                >
                  Try different products
                </button>

                <button
                  className="btn btn--ghost btn--full"
                  onClick={() => navigate("/upload")}
                >
                  Change photo
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TryOnResultPage;