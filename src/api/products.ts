import type { IProduct } from '@/types/model';

// Use json-server API
const API_BASE_URL = 'http://localhost:5005';

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
