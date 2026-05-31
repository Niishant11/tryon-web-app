import { useCallback } from 'react';
import { useTryOn } from '../../hooks/useTryOn';

export default function DropZone() {
  const { setImage } = useTryOn();

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImage({
              src: event.target.result,
              file: file,
              name: file.name,
            });
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setImage]
  );

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage({
          src: event.target.result,
          file: file,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-accent-500 rounded-lg p-12 text-center bg-navy-50 hover:bg-navy-100 transition cursor-pointer"
    >
      <div className="text-4xl mb-4">📷</div>
      <h3 className="text-xl font-semibold text-navy-900 mb-2">
        Drag & drop your photo here
      </h3>
      <p className="text-gray-600 mb-4">or click to select from your computer</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="inline-block px-6 py-2 bg-accent-500 text-navy-900 rounded font-semibold hover:bg-accent-400 transition cursor-pointer"
      >
        Choose Photo
      </label>
    </div>
  );
}
