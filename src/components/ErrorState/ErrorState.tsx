'use client';

import css from './ErrorState.module.css';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className={css.errorState}>
      <div className={css.errorIcon}>⚠️</div>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button
        className={css.retryButton}
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;
