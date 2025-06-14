// hooks/useProductFilter.ts
import { useMemo } from 'react';
import type { IProduct } from '@/types/model';

interface FilterOptions {
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  selectedTier: string;
  selectedTheme: string;
  selectedPrice: string;
}

const useProductFilter = (
  products: IProduct[],
  {
    searchTerm,
    selectedCategory,
    priceRange,
    selectedTier,
    selectedTheme,
    selectedPrice,
  }: FilterOptions
): IProduct[] => {
  return useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    result = result.filter(
      product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedTier) {
      result = result.filter(product => product.tier === selectedTier);
    }

    if (selectedTheme) {
      result = result.filter(product => product.theme === selectedTheme);
    }

    if (selectedPrice === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    priceRange,
    selectedTier,
    selectedTheme,
    selectedPrice,
  ]);
};

export default useProductFilter;
