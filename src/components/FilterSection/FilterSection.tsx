'use client';

import RangeSlider from '@/components/RangeSlider/RangeSlider';
import type { FilterState } from '@/types/model';
import {
  MAX_PRICE,
  MIN_PRICE,
  PRICE_OPTIONS,
  THEME_OPTIONS,
  TIER_OPTIONS,
} from '@/constants';

import css from './FilterSection.module.css';

interface FilterSectionProps {
  className?: string;
  filters: FilterState;
  onFilterChange: (
    key: keyof FilterState,
    value: string | number | [number, number]
  ) => void;
  onResetFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  className,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const { searchTerm, priceRange, selectedTier, selectedTheme, selectedPrice } =
    filters;

  const renderDropdown = (
    label: string,
    id: string,
    value: string,
    options: { value: string; label: string }[] | string[],
    onChange: (value: string) => void
  ) => (
    <div className={css.filterGroup}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={css.filterSelect}
        aria-label={`Select ${label}`}
      >
        <option value="" disabled>{`Select ${label}`}</option>
        {options.map(option =>
          typeof option === 'string' ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );

  return (
    <div className={`${css.filterSection} ${className}`}>
      {/* Search Input */}
      <div className={css.filterGroup}>
        <input
          type="text"
          placeholder="Search"
          className={css.searchInput}
          value={searchTerm}
          onChange={e => onFilterChange('searchTerm', e.target.value)}
          aria-label="Search"
        />
      </div>

      {/* Price Range Slider */}
      <div className={css.filterGroup}>
        <label>Price Range</label>
        <RangeSlider
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={priceRange}
          onChange={range => onFilterChange('priceRange', range)}
          step={0.1}
        />
        <div className={css.priceRangeValue}>
          {priceRange[0].toFixed(1)} - {priceRange[1].toFixed(1)} ETH
        </div>
      </div>

      {/* Tier Dropdown */}
      {renderDropdown('Tier', 'tier', selectedTier, TIER_OPTIONS, value =>
        onFilterChange('selectedTier', value)
      )}

      {/* Theme Dropdown */}
      {renderDropdown('Theme', 'theme', selectedTheme, THEME_OPTIONS, value =>
        onFilterChange('selectedTheme', value)
      )}

      {/* Price Dropdown */}
      {renderDropdown('Price', 'price', selectedPrice, PRICE_OPTIONS, value =>
        onFilterChange('selectedPrice', value)
      )}

      {/* Reset Filters Button */}
      <button
        className={css.resetFilterButton}
        onClick={onResetFilters}
        aria-label="Reset Filters"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
