// src/components/tryon/TryOnCanvas.jsx
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useTryOn } from '../../hooks/useTryOn';


const DRAW_ORDER = [
  'pants',
  'tshirt',
  'shirt',
  'jacket',
  'hat',
  'sunglasses',
  'watch'
];
// ─── Image loader ─────────────────────────────────────────────
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error(`Cannot load: ${src}`));
    img.src = src;
  });
}

// ─── Background Remover ───────────────
function removeBackground(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Remove white/light gray background
    if (
      r > 220 &&
      g > 220 &&
      b > 220
    ) {
      data[i + 3] = 0;
    }

    // Remove black background
    if (
      r < 25 &&
      g < 25 &&
      b < 25
    ) {
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

// ─── Core draw ────────────────────────────────────────────────
async function drawTryOn(canvas, modelSrc, products) {
  if (!canvas || !modelSrc) return;

  const ctx = canvas.getContext('2d');

  const modelImg = await loadImage(modelSrc);

  canvas.width = modelImg.naturalWidth || 1024;
  canvas.height = modelImg.naturalHeight || 1024;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    modelImg,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const sorted = [...products].sort((a, b) => {
    const ai = DRAW_ORDER.indexOf(a.category);
    const bi = DRAW_ORDER.indexOf(b.category);

    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });

  for (const product of sorted) {

    if (!product.overlay) continue;

    let productImg;

    try {
      productImg = await loadImage(product.image);
    } catch (err) {
      console.error(err);
      continue;
    }

    const scaleX = canvas.width / 1024;
    const scaleY = canvas.height / 1024;

    const pw = product.overlay.width * scaleX;

    const ph =
      (productImg.naturalHeight /
        productImg.naturalWidth) *
      pw;

    const px = product.overlay.x * scaleX;
    const py = product.overlay.y * scaleY;

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    const cleanedImage =
  removeBackground(productImg);

    ctx.drawImage(
        cleanedImage,
        px,
        py,
        pw,
        ph
);
  }

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}
// ─── Component ────────────────────────────────────────────────
// forwardRef lets TryOnResult.jsx call canvasRef.current.toDataURL()
const TryOnCanvas = forwardRef(function TryOnCanvas(_, ref) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError]         = useState(null);

  // ✅ FIX 1: use uploadedPhoto (string URL), not uploadedImage
  const { uploadedPhoto, selectedProducts } = useTryOn();

  // ✅ FIX 2: expose canvas to parent via forwardRef
  useImperativeHandle(ref, () => ({
    toDataURL: (type = 'image/png') => canvasRef.current?.toDataURL(type),
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    // ✅ FIX 3: guard uses uploadedPhoto, not uploadedImage
    if (!canvasRef.current || !uploadedPhoto || selectedProducts.length === 0) return;

    let cancelled = false;

    const render = async () => {
      setIsDrawing(true);
      setError(null);

      try {
       const productsForCanvas = selectedProducts.map(p => ({
        image: p.image,
        category: p.category,
        name: p.name,
        overlay: p.overlay
        }));
      

        // ✅ FIX 4: pass uploadedPhoto directly — it IS the src string
        await drawTryOn(canvasRef.current, uploadedPhoto, productsForCanvas);

        if (!cancelled) setIsDrawing(false);
      } catch (err) {
        console.error('Render error:', err);
        if (!cancelled) {
          setError('Failed to render. Check image URLs and CORS settings.');
          setIsDrawing(false);
        }
      }
    };

    render();
    return () => { cancelled = true; };

  }, [uploadedPhoto, selectedProducts]);

  // ── Empty states ─────────────────────────────────────────────
  if (!uploadedPhoto) {
    return (
      <div style={{
        background: 'var(--c-cream-deep)',
        border: '2px dashed var(--c-border)',
        borderRadius: 'var(--r-xl)',
        padding: '80px 40px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '16px',
      }}>
        <div style={{ fontSize: 48 }}>📷</div>
        <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--c-ink)' }}>
          Upload a photo first
        </p>
        <p className="caption">Go back to the upload step to add your photo.</p>
      </div>
    );
  }

  if (selectedProducts.length === 0) {
    return (
      <div style={{
        background: 'var(--c-cream-deep)',
        border: '2px dashed var(--c-border)',
        borderRadius: 'var(--r-xl)',
        padding: '80px 40px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '16px',
      }}>
        <div style={{ fontSize: 48 }}>👗</div>
        <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--c-ink)' }}>
          No products selected
        </p>
        <p className="caption">Go back and pick at least one item to try on.</p>
      </div>
    );
  }

  // ── Main canvas render ────────────────────────────────────────
  return (
    <div style={{ position: 'relative' }}>

      {/* Error banner */}
      {error && (
        <div style={{
          padding: '12px 16px', marginBottom: '12px',
          background: '#fee2e2', border: '1px solid #fca5a5',
          borderRadius: 'var(--r-md)', color: '#991b1b', fontSize: '13px',
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Canvas wrapper */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)',
        background: 'var(--c-cream-deep)',
      }}>

        {/* Loading bar at top */}
        {isDrawing && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '3px', background: 'var(--c-gold-tint)', zIndex: 10,
          }}>
            <div style={{
              height: '100%', background: 'var(--c-gold)',
              animation: 'loadBar 1.2s ease-in-out infinite',
              width: '40%',
            }} />
          </div>
        )}

        {/* Spinner overlay while rendering */}
        {isDrawing && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 9,
            background: 'rgba(250,248,245,.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '14px',
          }}>
            <div style={{
              width: 40, height: 40,
              border: '2.5px solid var(--c-border)',
              borderTopColor: 'var(--c-gold)',
              borderRadius: '50%',
              animation: 'spin .9s linear infinite',
            }} />
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--c-ink)' }}>
              Compositing your look…
            </p>
          </div>
        )}

        {/* THE CANVAS — ref attached here */}
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          aria-label="Virtual try-on preview"
        />
      </div>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes loadBar { to { margin-left: 110%; } }
      `}</style>
    </div>
  );
});

export default TryOnCanvas;