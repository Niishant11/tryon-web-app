import { useContext } from 'react';
import { TryOnContext } from '../context/TryOnContext';

export function useTryOn() {
  const context = useContext(TryOnContext);
  if (!context) {
    throw new Error('useTryOn must be used within TryOnProvider');
  }
  return context;
}
