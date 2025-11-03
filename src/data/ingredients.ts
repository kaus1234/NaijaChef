export interface Ingredient {
  id: string;
  name: string;
  category: string;
  icon: string;
  common: boolean;
}

export interface IngredientCategory {
  id: string;
  name: string;
  icon: string;
  ingredients: Ingredient[];
}

export const nigerianIngredients: IngredientCategory[] = [
  {
    id: 'proteins',
    name: 'Proteins',
    icon: '🥩',
    ingredients: [
      { id: 'chicken', name: 'Chicken', category: 'proteins', icon: '🍗', common: true },
      { id: 'beef', name: 'Beef', category: 'proteins', icon: '🥩', common: true },
      { id: 'fish', name: 'Fish', category: 'proteins', icon: '🐟', common: true },
      { id: 'goat-meat', name: 'Goat Meat', category: 'proteins', icon: '🐐', common: false },
      { id: 'turkey', name: 'Turkey', category: 'proteins', icon: '🦃', common: false },
      { id: 'eggs', name: 'Eggs', category: 'proteins', icon: '🥚', common: true },
      { id: 'stockfish', name: 'Stockfish', category: 'proteins', icon: '🐟', common: false },
      { id: 'smoked-fish', name: 'Smoked Fish', category: 'proteins', icon: '🐟', common: true },
      { id: 'prawns', name: 'Prawns', category: 'proteins', icon: '🦐', common: false },
      { id: 'crayfish', name: 'Crayfish', category: 'proteins', icon: '🦐', common: true },
      { id: 'sardines', name: 'Sardines', category: 'proteins', icon: '🐟', common: false },
      { id: 'titus-fish', name: 'Titus Fish', category: 'proteins', icon: '🐟', common: true },
      { id: 'shrimp', name: 'Shrimp', category: 'proteins', icon: '🦐', common: false },
      { id: 'snail', name: 'Snail', category: 'proteins', icon: '🐌', common: false },
      { id: 'cow-leg', name: 'Cow Leg', category: 'proteins', icon: '🦴', common: false },
    ],
  },
  {
    id: 'carbohydrates',
    name: 'Carbohydrates',
    icon: '🍚',
    ingredients: [
      { id: 'rice', name: 'Rice', category: 'carbohydrates', icon: '🍚', common: true },
      { id: 'garri', name: 'Garri', category: 'carbohydrates', icon: '🥖', common: true },
      { id: 'yam', name: 'Yam', category: 'carbohydrates', icon: '🍠', common: true },
      { id: 'plantain', name: 'Plantain', category: 'carbohydrates', icon: '🍌', common: true },
      { id: 'beans', name: 'Beans', category: 'carbohydrates', icon: '🫘', common: true },
      { id: 'semolina', name: 'Semolina', category: 'carbohydrates', icon: '🍝', common: false },
      { id: 'wheat', name: 'Wheat', category: 'carbohydrates', icon: '🌾', common: false },
      { id: 'eba', name: 'Eba', category: 'carbohydrates', icon: '🥖', common: true },
      { id: 'poundo-yam', name: 'Poundo Yam', category: 'carbohydrates', icon: '🍠', common: false },
      { id: 'spaghetti', name: 'Spaghetti', category: 'carbohydrates', icon: '🍝', common: false },
      { id: 'macaroni', name: 'Macaroni', category: 'carbohydrates', icon: '🍝', common: false },
      { id: 'bread', name: 'Bread', category: 'carbohydrates', icon: '🍞', common: true },
    ],
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '🥬',
    ingredients: [
      { id: 'tomatoes', name: 'Tomatoes', category: 'vegetables', icon: '🍅', common: true },
      { id: 'onions', name: 'Onions', category: 'vegetables', icon: '🧅', common: true },
      { id: 'tatashe', name: 'Tatashe (Bell Pepper)', category: 'vegetables', icon: '🫑', common: true },
      { id: 'bell-pepper', name: 'Bell Pepper', category: 'vegetables', icon: '🫑', common: false },
      { id: 'ugu', name: 'Ugu (Pumpkin Leaves)', category: 'vegetables', icon: '🥬', common: true },
      { id: 'spinach', name: 'Spinach', category: 'vegetables', icon: '🥬', common: false },
      { id: 'bitter-leaf', name: 'Bitter Leaf', category: 'vegetables', icon: '🥬', common: false },
      { id: 'water-leaf', name: 'Water Leaf', category: 'vegetables', icon: '🥬', common: false },
      { id: 'okra', name: 'Okra', category: 'vegetables', icon: '🥬', common: true },
      { id: 'garden-eggs', name: 'Garden Eggs', category: 'vegetables', icon: '🍆', common: false },
    ],
  },
  {
    id: 'oils-fats',
    name: 'Oils & Fats',
    icon: '🫒',
    ingredients: [
      { id: 'palm-oil', name: 'Palm Oil', category: 'oils-fats', icon: '🫒', common: true },
      { id: 'vegetable-oil', name: 'Vegetable Oil', category: 'oils-fats', icon: '🫒', common: true },
      { id: 'groundnut-oil', name: 'Groundnut Oil', category: 'oils-fats', icon: '🥜', common: false },
      { id: 'butter', name: 'Butter', category: 'oils-fats', icon: '🧈', common: false },
      { id: 'margarine', name: 'Margarine', category: 'oils-fats', icon: '🧈', common: false },
      { id: 'coconut-oil', name: 'Coconut Oil', category: 'oils-fats', icon: '🥥', common: false },
    ],
  },
  {
    id: 'spices-seasonings',
    name: 'Spices & Seasonings',
    icon: '🧂',
    ingredients: [
      { id: 'curry-powder', name: 'Curry Powder', category: 'spices-seasonings', icon: '🧂', common: true },
      { id: 'thyme', name: 'Thyme', category: 'spices-seasonings', icon: '🌿', common: true },
      { id: 'nutmeg', name: 'Nutmeg', category: 'spices-seasonings', icon: '🌰', common: false },
      { id: 'ginger', name: 'Ginger', category: 'spices-seasonings', icon: '🫚', common: true },
      { id: 'garlic', name: 'Garlic', category: 'spices-seasonings', icon: '🧄', common: true },
      { id: 'salt', name: 'Salt', category: 'spices-seasonings', icon: '🧂', common: true },
      { id: 'maggi', name: 'Maggi', category: 'spices-seasonings', icon: '🧂', common: true },
      { id: 'knorr', name: 'Knorr', category: 'spices-seasonings', icon: '🧂', common: true },
      { id: 'crayfish', name: 'Crayfish', category: 'spices-seasonings', icon: '🦐', common: true },
      { id: 'uda', name: 'Uda', category: 'spices-seasonings', icon: '🌿', common: false },
      { id: 'uziza', name: 'Uziza', category: 'spices-seasonings', icon: '🌿', common: false },
      { id: 'ehuru', name: 'Ehuru', category: 'spices-seasonings', icon: '🌰', common: false },
      { id: 'alligator-pepper', name: 'Alligator Pepper', category: 'spices-seasonings', icon: '🌶️', common: false },
      { id: 'scent-leaf', name: 'Scent Leaf', category: 'spices-seasonings', icon: '🌿', common: false },
      { id: 'ogbono', name: 'Ogbono', category: 'spices-seasonings', icon: '🌰', common: false },
    ],
  },
];

// Helper functions
export const getAllIngredients = (): Ingredient[] => {
  return nigerianIngredients.flatMap(category => category.ingredients);
};

export const getIngredientById = (id: string): Ingredient | undefined => {
  return getAllIngredients().find(ingredient => ingredient.id === id);
};

export const getIngredientsByCategory = (categoryId: string): Ingredient[] => {
  const category = nigerianIngredients.find(cat => cat.id === categoryId);
  return category ? category.ingredients : [];
};

export const getCommonIngredients = (): Ingredient[] => {
  return getAllIngredients().filter(ingredient => ingredient.common);
};

export const searchIngredients = (query: string): Ingredient[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllIngredients().filter(ingredient =>
    ingredient.name.toLowerCase().includes(lowercaseQuery)
  );
};