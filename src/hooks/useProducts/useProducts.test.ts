import { renderHook, act } from '@testing-library/react';
import useProducts from '@/hooks/useProducts';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { fetchProducts } from '@/api/products';
import type { IProduct } from '@/types/model';

// Mock type IProduct
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
    id: 2,
    title: 'Product B',
    category: 'Upper Body',
    price: 30,
    tier: 'Basic',
    theme: 'Light',
    createdAt: Date.now() - 86400000,
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
];

// Mock fetchProducts
vi.mock('@/api/products', () => ({
  fetchProducts: vi.fn(),
}));

describe('useProducts hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initializes with loading state and empty products', () => {
    const { result } = renderHook(() => useProducts());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toHaveLength(0);
    expect(result.current.newArrivals).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });

  test('fetches products and sets new arrivals successfully', async () => {
    (fetchProducts as Mock).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toHaveLength(2);
    expect(result.current.products).toEqual(
      expect.arrayContaining(mockProducts)
    );
    expect(result.current.newArrivals).toHaveLength(2);
    expect(result.current.newArrivals[0].createdAt).toBeGreaterThanOrEqual(
      result.current.newArrivals[1].createdAt
    );
    expect(result.current.error).toBeNull();
  });

  test('handles fetch error', async () => {
    const errorMessage = 'Failed to load products. Please try again later.';
    (fetchProducts as Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toHaveLength(0);
    expect(result.current.newArrivals).toHaveLength(0);
    expect(result.current.error).toBe(errorMessage);
  });

  test('sorts new arrivals by createdAt descending', async () => {
    const productsWithDates = [
      { ...mockProducts[0], createdAt: Date.now() - 86400000 },
      { ...mockProducts[1], createdAt: Date.now() },
    ];
    (fetchProducts as Mock).mockResolvedValue(productsWithDates);

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.newArrivals).toHaveLength(2);
    expect(result.current.newArrivals[0].title).toBe('Product B');
    expect(result.current.newArrivals[1].title).toBe('Product A');
  });
});
