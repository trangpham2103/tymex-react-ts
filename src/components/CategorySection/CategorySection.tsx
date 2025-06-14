'use client';

import { CATEGORY_OPTIONS } from '@/constants';
import css from './CategorySection.module.css';

interface CategorySectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  
  return (
    <div className={css.categories}>
      {CATEGORY_OPTIONS.map(category => (
        <button
          key={category}
          className={`${css.categoryButton} ${
            selectedCategory === category ? css.active : ''
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySection;
