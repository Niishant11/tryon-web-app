import { useTryOn } from '../../hooks/useTryOn';

export default function ImagePreview() {
  const { uploadedImage, setImage } = useTryOn();

  if (!uploadedImage) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={uploadedImage.src}
          alt="Uploaded preview"
          className="w-full h-auto max-h-96 object-cover"
        />
        <button
          onClick={() => setImage(null)}
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">
          <strong>File:</strong> {uploadedImage.name}
        </p>
      </div>
    </div>
  );
}
