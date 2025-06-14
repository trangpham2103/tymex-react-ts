'use client';

import { useState, useReducer, useMemo, useCallback } from 'react';
import Header from '@/components/Header/Header';
import CategorySection from '@/components/CategorySection/CategorySection';
import FilterSection from '@/components/FilterSection/FilterSection';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import Footer from '@/components/Footer/Footer';
import LoadingState from '@/components/LoadingState/LoadingState';
import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorState from '@/components/ErrorState/ErrorState';
import useProducts from '@/hooks/useProducts';
import useProductFilter from '@/hooks/useProductFilter';
import type { FilterAction, FilterState } from '@/types/model';
import { MAX_PRICE, MIN_PRICE } from './constants';

import css from './App.module.css';

const INITIAL_VISIBLE_PRODUCTS = 8;
const LOAD_MORE_STEP = 4;

const initialState = {
  searchTerm: '',
  selectedCategory: 'All',
  priceRange: [MIN_PRICE, MAX_PRICE] as [number, number],
  selectedTier: '',
  selectedTheme: '',
  selectedPrice: '',
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_FILTER':
      if (action.payload) {
        return { ...state, [action.payload.key]: action.payload.value };
      }
      return state;
    case 'RESET_FILTERS':
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [filterState, dispatch] = useReducer(filterReducer, initialState);
  const [visibleProducts, setVisibleProducts] = useState(
    INITIAL_VISIBLE_PRODUCTS
  );

  const { products, isLoading, error, newArrivals } = useProducts();

  const filteredProducts = useProductFilter(products, filterState);

  const visibleFilteredProducts = useMemo(
    () => filteredProducts.slice(0, visibleProducts),
    [filteredProducts, visibleProducts]
  );

  const handleLoadMore = useCallback(
    () => setVisibleProducts(prev => prev + LOAD_MORE_STEP),
    []
  );

  const handleResetFilters = useCallback(
    () => dispatch({ type: 'RESET_FILTERS' }),
    []
  );

  const renderMainContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (filteredProducts.length === 0)
      return <EmptyState onReset={handleResetFilters} />;

    return (
      <ProductGrid
        products={visibleFilteredProducts}
        onLoadMore={handleLoadMore}
        hasMore={visibleProducts < filteredProducts.length}
      />
    );
  };

  return (
    <>
      <Header newArrivals={newArrivals} />
      <main className={css.mainContent}>
        <FilterSection
          filters={filterState}
          onFilterChange={(key, value) =>
            dispatch({ type: 'SET_FILTER', payload: { key, value } })
          }
          onResetFilters={handleResetFilters}
        />
        <div className={css.rightSection}>
          <CategorySection
            selectedCategory={filterState.selectedCategory}
            onCategoryChange={value =>
              dispatch({
                type: 'SET_FILTER',
                payload: { key: 'selectedCategory', value },
              })
            }
          />
          {renderMainContent()}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
