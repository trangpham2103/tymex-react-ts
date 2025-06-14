'use client';

import type { IProduct } from '@/types/model';
import { FEATURED_IMG_URL } from '@/constants';

import css from './Header.module.css';

interface HeaderProps {
  newArrivals: IProduct[];
}
const Header: React.FC<HeaderProps> = ({ newArrivals }) => {
  return (
    <header className={css.header}>
      <div className={css.headerContent}>
        <div className={css.newArrivalSection}>
          <h1 className={css.newArrivalTitle}>NEW ARRIVAL</h1>
          <div className={css.featuredItems}>
            {newArrivals.length > 0
              ? newArrivals.map((product, index) => (
                  <img
                    key={index}
                    className={css.featuredItem}
                    src={product?.author?.avatar}
                    alt={product?.title}
                  />
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`${css.featuredItem} ${css.skeleton}`}
                  />
                ))}
          </div>
        </div>
        <div className={css.featuredProduct}>
          <div className={css.featuredProductLabel}>
            <img
              className={css.featuredProductImage}
              src={FEATURED_IMG_URL}
              alt="Featured DJ"
            />
            <span className={css.featuredProductTitle}>The DJ</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
