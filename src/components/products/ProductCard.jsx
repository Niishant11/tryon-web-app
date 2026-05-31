import { useTryOn } from '../../hooks/useTryOn';

export default function ProductCard({ product }) {
  const { selectedProducts, addProduct, removeProduct } = useTryOn();

  const isSelected = selectedProducts.some((p) => p.id === product.id);

  const handleToggle = () => {
    if (isSelected) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badge */}
        <div className="absolute top-2 right-2">
          <span className="text-xs bg-navy-600 text-white px-3 py-1 rounded-full font-semibold">
            {product.category}
          </span>
        </div>
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-accent-500 rounded-full p-3">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-navy-900 mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Color */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-accent-600">
            ₹{product.price?.toLocaleString()}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {product.color}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleToggle}
          className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isSelected
              ? 'bg-accent-500 text-navy-900 hover:bg-accent-400 shadow-md'
              : 'bg-navy-600 text-white hover:bg-navy-700 shadow-sm'
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            {isSelected ? (
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            ) : (
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11 10.07 7.5 12 7.5s3.5 1.57 3.5 3.5z"/>
            )}
          </svg>
          {isSelected ? 'Selected' : 'Try On'}
        </button>
      </div>
    </div>
  );
}
