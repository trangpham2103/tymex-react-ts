'use client';

import ProductCard from '@/components/ProductCard/ProductCard';
import type { IProduct } from '@/types/model';

import css from './ProductGrid.module.css';

interface ProductGridProps {
  products: IProduct[];
  onLoadMore: () => void;
  hasMore: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onLoadMore,
  hasMore,
}) => {
  return (
    <div className={css.productGridContainer}>
      <div className={css.productGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div className={css.loadMoreContainer}>
          <button className={css.viewMoreButton} onClick={onLoadMore}>
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
