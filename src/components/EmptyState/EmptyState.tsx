'use client';

import css from './EmptyState.module.css';

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className={css.emptyState}>
      <div className={css.emptyStateIcon}>🔍</div>
      <h2>No products found</h2>
      <p>We couldn't find any products matching your criteria.</p>
      <button className={css.resetFilterButton} onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default EmptyState;
