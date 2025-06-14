import { render, screen, fireEvent } from '@testing-library/react';
import App from '@/App';
import useProducts from '@/hooks/useProducts';
import useProductFilter from '@/hooks/useProductFilter';
import { vi } from 'vitest';

// Mock constants
vi.mock('@/constants', () => ({
  MIN_PRICE: 0,
  MAX_PRICE: 100,
}));

// Mock hooks
vi.mock('@/hooks/useProducts', () => ({
  default: vi.fn(() => ({
    products: [],
    newArrivals: [],
    isLoading: false,
    error: null,
  })),
}));

vi.mock('@/hooks/useProductFilter', () => ({
  default: vi.fn(
    (
      products: {
        id: number;
        title: string;
        price: number;
        category: string;
        createdAt: number;
        isFavorite: boolean;
        imageId: string;
        author: { name: string; avatar: string };
      }[]
    ) => products
  ),
}));

// Mock components
vi.mock('@/components/Header/Header', () => ({
  default: () => <div data-testid="mock-header" />,
}));

vi.mock('@/components/CategorySection/CategorySection', () => ({
  default: () => <div data-testid="mock-category-section" />,
}));

vi.mock('@/components/FilterSection/FilterSection', () => ({
  default: () => (
    <div data-testid="mock-filter-section">
      <button data-testid="mock-reset-filters">Reset</button>
    </div>
  ),
}));

vi.mock('@/components/ProductGrid/ProductGrid', () => ({
  default: ({
    onLoadMore,
    hasMore,
  }: {
    onLoadMore: () => void;
    hasMore: boolean;
  }) => (
    <div data-testid="mock-product-grid">
      {hasMore && (
        <button data-testid="mock-load-more" onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  ),
}));

vi.mock('@/components/Footer/Footer', () => ({
  default: () => <div data-testid="mock-footer" />,
}));

vi.mock('@/components/LoadingState/LoadingState', () => ({
  default: () => <div data-testid="mock-loading-state" />,
}));

vi.mock('@/components/EmptyState/EmptyState', () => ({
  default: () => <div data-testid="mock-empty-state" />,
}));

vi.mock('@/components/ErrorState/ErrorState', () => ({
  default: () => <div data-testid="mock-error-state" />,
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state initially', () => {
    (useProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
      newArrivals: [],
    });

    render(<App />);
    expect(screen.getByTestId('mock-loading-state')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-product-grid')).not.toBeInTheDocument();
  });

  test('renders error state when error occurs', async () => {
    (useProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      products: [],
      isLoading: false,
      error: 'Failed to load products.',
      newArrivals: [],
    });

    render(<App />);
    expect(screen.getByTestId('mock-error-state')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-product-grid')).not.toBeInTheDocument();
  });

  test('renders empty state when no filtered products', async () => {
    (useProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      products: [
        {
          id: 1,
          title: 'Product A',
          price: 50,
          category: 'All',
          createdAt: Date.now(),
          isFavorite: false,
          imageId: 'img1',
          author: { name: 'Author1', avatar: 'avatar1.png' },
        },
      ],
      isLoading: false,
      error: null,
      newArrivals: [],
    });
    (useProductFilter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      []
    );

    render(<App />);
    expect(screen.getByTestId('mock-empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-product-grid')).not.toBeInTheDocument();
  });

  test('renders product grid with filtered products', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product A',
        price: 50,
        category: 'All',
        createdAt: Date.now(),
        isFavorite: false,
        imageId: 'img1',
        author: { name: 'Author1', avatar: 'avatar1.png' },
      },
      {
        id: 2,
        title: 'Product B',
        price: 30,
        category: 'All',
        createdAt: Date.now(),
        isFavorite: true,
        imageId: 'img2',
        author: { name: 'Author2', avatar: 'avatar2.png' },
      },
    ];
    (useProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      newArrivals: mockProducts.slice(0, 2),
    });
    (useProductFilter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockProducts
    );

    render(<App />);
    expect(screen.getByTestId('mock-product-grid')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-filter-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-category-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('handles load more button click', async () => {
    const mockProducts = Array(12)
      .fill(0)
      .map((_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        price: 50,
        category: 'All',
        createdAt: Date.now(),
        isFavorite: false,
        imageId: `img${i + 1}`,
        author: { name: `Author${i + 1}`, avatar: `avatar${i + 1}.png` },
      }));
    (useProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      newArrivals: mockProducts.slice(0, 2),
    });
    (useProductFilter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockProducts
    );

    render(<App />);
    const productGrid = screen.getByTestId('mock-product-grid');
    expect(productGrid).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('mock-load-more'));
    expect(mockProducts.length).toBeGreaterThan(8);
  });

  test('dispatches reset filters action', () => {
    render(<App />);
    const filterSection = screen.getByTestId('mock-filter-section');

    fireEvent.click(screen.getByTestId('mock-reset-filters'));
    expect(filterSection).toBeInTheDocument();
  });
});
