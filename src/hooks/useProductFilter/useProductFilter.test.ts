import { renderHook } from '@testing-library/react';
import useProductFilter from '@/hooks/useProductFilter';
import type { IProduct } from '@/types/model';

// Mock type IProduct (giả định cấu trúc từ db.json)
const mockProducts: IProduct[] = [
  {
    id: 1,
    title: 'Product A',
    category: 'Accessory',
    price: 50,
    tier: 'Premium',
    theme: 'Dark',
    createdAt: Date.now(),
    isFavorite: false,
    imageId: 1,
    authorId: 1,
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      gender: 'male',
      avatar: 'avatar1.png',
      onlineStatus: 'online',
    },
  },
  {
    id: 2,
    title: 'Product B',
    category: 'Upper Body',
    price: 30,
    tier: 'Basic',
    theme: 'Light',
    createdAt: Date.now(),
    isFavorite: true,
    imageId: 2,
    authorId: 2,
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      gender: 'male',
      avatar: 'avatar1.png',
      onlineStatus: 'online',
    },
  },
  {
    id: 3,
    title: 'Product C',
    category: 'Accessory',
    price: 70,
    tier: 'Premium',
    theme: 'Dark',
    createdAt: Date.now(),
    isFavorite: false,
    imageId: 3,
    authorId: 3,
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      gender: 'male',
      avatar: 'avatar1.png',
      onlineStatus: 'online',
    },
  },
];

describe('useProductFilter hook', () => {
  test('returns all products when no filters applied', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: '',
        selectedCategory: 'All',
        priceRange: [0, 100],
        selectedTier: '',
        selectedTheme: '',
        selectedPrice: '',
      })
    );
    expect(result.current).toHaveLength(3);
    expect(result.current).toEqual(expect.arrayContaining(mockProducts));
  });

  test('filters products by search term', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: 'Product A',
        selectedCategory: 'All',
        priceRange: [0, 100],
        selectedTier: '',
        selectedTheme: '',
        selectedPrice: '',
      })
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe('Product A');
  });

  test('filters products by category', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: '',
        selectedCategory: 'Accessory',
        priceRange: [0, 100],
        selectedTier: '',
        selectedTheme: '',
        selectedPrice: '',
      })
    );
    expect(result.current).toHaveLength(2);
    expect(result.current.every(p => p.category === 'Accessory')).toBe(true);
  });

  test('filters products by price range', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: '',
        selectedCategory: 'All',
        priceRange: [40, 60],
        selectedTier: '',
        selectedTheme: '',
        selectedPrice: '',
      })
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].price).toBe(50);
  });

  test('filters products by tier', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: '',
        selectedCategory: 'All',
        priceRange: [0, 100],
        selectedTier: 'Premium',
        selectedTheme: '',
        selectedPrice: '',
      })
    );
    expect(result.current).toHaveLength(2);
    expect(result.current.every(p => p.tier === 'Premium')).toBe(true);
  });

  test('filters products by theme', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: '',
        selectedCategory: 'All',
        priceRange: [0, 100],
        selectedTier: '',
        selectedTheme: 'Dark',
        selectedPrice: '',
      })
    );
    expect(result.current).toHaveLength(2);
    expect(result.current.every(p => p.theme === 'Dark')).toBe(true);
  });

  test('sorts products low to high', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: '',
        selectedCategory: 'All',
        priceRange: [0, 100],
        selectedTier: '',
        selectedTheme: '',
        selectedPrice: 'low-to-high',
      })
    );
    expect(result.current.map(p => p.price)).toEqual([30, 50, 70]);
  });

  test('sorts products high to low', () => {
    const { result } = renderHook(() =>
      useProductFilter(mockProducts, {
        searchTerm: '',
        selectedCategory: 'All',
        priceRange: [0, 100],
        selectedTier: '',
        selectedTheme: '',
        selectedPrice: 'high-to-low',
      })
    );
    expect(result.current.map(p => p.price)).toEqual([70, 50, 30]);
  });
});
