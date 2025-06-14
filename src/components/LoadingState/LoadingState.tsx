'use client';

import css from './LoadingState.module.css';

const LoadingState: React.FC = () => {
  return (
    <div className={css.loadingState}>
      <div className={css.loadingSpinner}></div>
      <p>Loading products...</p>
    </div>
  );
};

export default LoadingState;
