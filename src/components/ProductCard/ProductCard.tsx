'use client';

import type { IProduct } from '@/types/model';
import { Heart } from 'lucide-react';

import css from './ProductCard.module.css';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, tier, price, isFavorite, author: { avatar } = {} } = product;
  return (
    <div className={css.productCard}>
      <div className={css.productImage}>
        <img src={avatar} />
      </div>
      <div className={css.productInfo}>
        <h3 className={css.productName}>{title}</h3>
        <p className={css.productTier}>{tier}</p>
        <div className={css.productPriceFavorite}>
          <p className={css.productPrice}>{price.toFixed(2)} ETH</p>
          <button
            className={`${css.favoriteButton} ${isFavorite ? css.active : ''}`}
            aria-label="Add to favorites"
          >
            <Heart className={isFavorite ? css.filled : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
