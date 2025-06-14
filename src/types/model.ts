export interface IProduct {
  id: number;
  title: string;
  category:
    | 'Upper Body'
    | 'Lower Body'
    | 'Hat'
    | 'Shoes'
    | 'Accessory'
    | 'Legendary'
    | 'Mythic'
    | 'Epic'
    | 'Rare';
  price: number;
  isFavorite: boolean;
  createdAt: number;
  theme: 'Dark' | 'Light' | 'Colorful' | 'Halloween';
  tier: 'Basic' | 'Premium' | 'Deluxe';
  imageId: number; // 1 -> 20 (integer)
  authorId: number;
  author?: IAuthor;
}

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  onlineStatus: string;
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  selectedTier: string;
  selectedTheme: string;
  selectedPrice: string;
}

export interface FilterAction {
  type: string;
  payload?: {
    key: keyof FilterState;
    value: string | number | [number, number];
  };
}
