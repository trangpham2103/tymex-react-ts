import { render, screen, fireEvent } from '@testing-library/react';
import FilterSection from '@/components/FilterSection/FilterSection';
import { vi } from 'vitest';
import { useState } from 'react';

// Mock constants
vi.mock('@/constants', () => ({
  MIN_PRICE: 0,
  MAX_PRICE: 100,
  PRICE_OPTIONS: ['Low', 'Medium', 'High'],
  THEME_OPTIONS: [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ],
  TIER_OPTIONS: ['Basic', 'Premium', 'Elite'],
}));

// Mock RangeSlider component with state
vi.mock('@/components/RangeSlider/RangeSlider', () => ({
  default: function MockRangeSlider({
    value,
    onChange,
  }: {
    value: [number, number];
    onChange: (range: [number, number]) => void;
  }) {
    const [range, setRange] = useState(value);
    return (
      <div data-testid="mock-range-slider">
        <input
          type="range"
          min={0}
          max={100}
          value={range[0]}
          onChange={e => {
            const newMin = parseFloat(e.target.value);
            const newRange: [number, number] = [newMin, range[1]];
            setRange(newRange);
            onChange(newRange);
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={range[1]}
          onChange={e => {
            const newMax = parseFloat(e.target.value);
            const newRange: [number, number] = [range[0], newMax];
            setRange(newRange);
            onChange(newRange);
          }}
        />
      </div>
    );
  },
}));

describe('FilterSection Component', () => {
  const mockFilters = {
    searchTerm: '',
    priceRange: [0, 100] as [number, number],
    selectedCategory: '',
    selectedTier: '',
    selectedTheme: '',
    selectedPrice: '',
  };

  const mockOnFilterChange = vi.fn();
  const mockOnResetFilters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all filter components', () => {
    render(
      <FilterSection
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByTestId('mock-range-slider')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Tier')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Theme')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Reset Filters')).toBeInTheDocument();
  });

  test('handles search input change', () => {
    render(
      <FilterSection
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('searchTerm', 'test');
  });

  test('handles price range slider change', () => {
    render(
      <FilterSection
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );

    const rangeSlider = screen.getByTestId('mock-range-slider');
    const minInput = rangeSlider.querySelector(
      'input[type="range"]:first-child'
    ) as HTMLInputElement;
    fireEvent.change(minInput, { target: { value: '25' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('priceRange', [25, 100]);

    const maxInput = rangeSlider.querySelector(
      'input[type="range"]:last-child'
    ) as HTMLInputElement;
    fireEvent.change(maxInput, { target: { value: '75' } });
    expect(mockOnFilterChange).toHaveBeenLastCalledWith('priceRange', [25, 75]);
  });

  test('handles tier dropdown change', () => {
    render(
      <FilterSection
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );

    const tierSelect = screen.getByLabelText('Select Tier');
    fireEvent.change(tierSelect, { target: { value: 'Premium' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('selectedTier', 'Premium');
  });

  test('handles theme dropdown change', () => {
    render(
      <FilterSection
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );

    const themeSelect = screen.getByLabelText('Select Theme');
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('selectedTheme', 'dark');
  });

  test('handles price dropdown change', () => {
    render(
      <FilterSection
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );

    const priceSelect = screen.getByLabelText('Select Price');
    fireEvent.change(priceSelect, { target: { value: 'Medium' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('selectedPrice', 'Medium');
  });

  test('handles reset filters button click', () => {
    render(
      <FilterSection
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );

    const resetButton = screen.getByLabelText('Reset Filters');
    fireEvent.click(resetButton);
    expect(mockOnResetFilters).toHaveBeenCalled();
  });
});
