import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { vi } from 'vitest';
import type { IProduct } from '@/types/model';

// Mock Lucide-React icons
vi.mock('lucide-react', () => ({
  Heart: ({ className }: { className?: string }) => (
    <svg data-testid="mock-heart" className={className} />
  ),
}));

// Mock CSS module
vi.mock('@/components/ProductCard/ProductCard.module.css', () => ({
  default: {
    favoriteButton: 'favoriteButton',
    active: 'active',
    filled: 'filled',
  },
}));

describe('ProductCard Component', () => {
  const mockProduct: IProduct = {
    id: 1,
    title: 'Sample Product',
    tier: 'Premium',
    price: 49.99,
    isFavorite: false,
    category: 'Accessory',
    createdAt: Date.now(),
    theme: 'Dark',
    imageId: 1,
    authorId: 1,
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      avatar: 'https://example.com/avatar.png',
      onlineStatus: 'online',
    },
  };

  test('renders product card with favorite button active when isFavorite is true', () => {
    const favoriteProduct = { ...mockProduct, isFavorite: true };
    render(<ProductCard product={favoriteProduct} />);

    const favoriteButton = screen.getByLabelText('Add to favorites');
    expect(favoriteButton).toHaveClass('favoriteButton active');
    expect(screen.getByTestId('mock-heart')).toHaveClass('filled');
  });
});