import { useState, useEffect } from 'react';
import { fetchProducts } from '@/api/products';
import type { IProduct } from '@/types/model';

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        const sortedArrivals = [...data]
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 4);
        setNewArrivals(sortedArrivals);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, newArrivals, isLoading, error };
};

export default useProducts;
