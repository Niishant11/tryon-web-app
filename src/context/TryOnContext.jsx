import { createContext, useState } from 'react';

export const TryOnContext = createContext();

export function TryOnProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [tryOnResults, setTryOnResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearProducts = () => {
    setSelectedProducts([]);
  };

  const addTryOnResult = (result) => {
    setTryOnResults((prev) => [...prev, result]);
  };

  const clearResults = () => {
    setTryOnResults([]);
  };

  return (
    <TryOnContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        uploadedPhoto,
        setUploadedPhoto,
        tryOnResults,
        isProcessing,
        setIsProcessing,
        addProduct,
        removeProduct,
        clearProducts,
        addTryOnResult,
        clearResults,
      }}
    >
      {children}
    </TryOnContext.Provider>
  );
}
