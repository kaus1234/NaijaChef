import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: { step: number; instruction: string; time?: string }[];
  cookingTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cost: string;
  category: string;
}

interface MealPlan {
  id: string;
  week: string;
  days: {
    day: string;
    meals: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
  }[];
  shoppingList: {
    category: string;
    items: { name: string; quantity: string; checked: boolean }[];
  }[];
}

interface RecipeContextType {
  selectedIngredients: string[];
  generatedRecipes: Recipe[];
  mealPlan: MealPlan | null;
  loading: boolean;
  error: string | null;
  setSelectedIngredients: (ingredients: string[]) => void;
  generateRecipes: () => Promise<void>;
  generateMealPlan: () => Promise<void>;
  clearRecipes: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipes = async () => {
    try {
      if (selectedIngredients.length < 2) {
        setError('Please select at least 2 ingredients');
        return;
      }

      setLoading(true);
      setError(null);

      // Simulate API call to OpenAI
      const mockRecipes: Recipe[] = [
        {
          id: '1',
          title: 'Classic Jollof Rice',
          description: 'Perfectly spiced jollof rice with chicken',
          ingredients: [
            { name: 'Rice', quantity: '2 cups' },
            { name: 'Tomatoes', quantity: '4 medium' },
            { name: 'Onions', quantity: '2 medium' },
            { name: 'Chicken', quantity: '500g' },
          ],
          instructions: [
            { step: 1, instruction: 'Parboil rice for 10 minutes', time: '10 mins' },
            { step: 2, instruction: 'Blend tomatoes and peppers', time: '5 mins' },
            { step: 3, instruction: 'Cook the rice in tomato sauce', time: '20 mins' },
          ],
          cookingTime: '35 minutes',
          servings: 4,
          difficulty: 'Medium',
          cost: '₦1,500',
          category: 'Main Dish',
        },
        {
          id: '2',
          title: 'Egusi Soup',
          description: 'Rich and flavorful melon seed soup',
          ingredients: [
            { name: 'Egusi', quantity: '2 cups' },
            { name: 'Spinach', quantity: '1 bunch' },
            { name: 'Palm Oil', quantity: '1/2 cup' },
          { name: 'Stockfish', quantity: '1 piece' },
          { name: 'Crayfish', quantity: '2 tbsp' },
          { name: 'Ugu', quantity: '1 bunch' },
          { name: 'Pepper', quantity: '3' },
          { name: 'Onion', quantity: '1' },
            { name: 'Maggi', quantity: '2' },
            { name: 'Salt', quantity: 'to taste' },
          ],
          instructions: [
            { step: 1, instruction: 'Boil and grind egusi seeds', time: '15 mins' },
            { step: 2, instruction: 'Cook vegetables in palm oil', time: '10 mins' },
            { step: 3, instruction: 'Add egusi paste and cook', time: '15 mins' },
            { step: 4, instruction: 'Add spinach and stockfish', time: '5 mins' },
          ],
          cookingTime: '45 minutes',
          servings: 6,
          difficulty: 'Medium',
          cost: '₦2,500',
          category: 'Soup',
        },
        {
          id: '3',
          title: 'Pounded Yam',
          description: 'Smooth and fluffy pounded yam with soup',
          ingredients: [
            { name: 'Yam', quantity: '1 large tuber' },
            { name: 'Efo Riro', quantity: '1 pot' },
            { name: 'Red Palm Oil', quantity: '3 tbsp' },
            { name: 'Irish Potatoes', quantity: '2 medium' },
            { name: 'Scotch Bonnet', quantity: '1 bunch' },
            { name: 'Onion', quantity: '1' },
            { name: 'Crayfish', quantity: '1 tbsp' },
            { name: 'Salt', quantity: 'to taste' },
          ],
          instructions: [
            { step: 1, instruction: 'Peel and boil yam until soft', time: '20 mins' },
            { step: 2, instruction: 'Cook vegetables for efo riro', time: '15 mins' },
            { step: 3, instruction: 'Pound yam until smooth', time: '10 mins' },
          ],
          cookingTime: '45 minutes',
          servings: 4,
          difficulty: 'Easy',
          cost: '₦2,000',
          category: 'Main Dish',
        },
        {
          id: '4',
          title: 'Nigerian Fried Rice',
          description: 'Colorful and flavorful fried rice with vegetables',
          ingredients: [
            { name: 'Rice', quantity: '2 cups' },
            { name: 'Shrimps', quantity: '200g' },
            { name: 'Liver', quantity: '200g' },
            { name: 'Carrots', quantity: '1 medium' },
            { name: 'Green Beans', quantity: '1 cup' },
            { name: 'Peas', quantity: '1 cup' },
            { name: 'Onions', quantity: '1 medium' },
            { name: 'Vegetable Oil', quantity: '3 tbsp' },
            { name: 'Curry Powder', quantity: '2 tsp' },
            { name: 'Thyme', quantity: '1 tsp' },
          ],
          instructions: [
            { step: 1, instruction: 'Parboil rice and set aside', time: '10 mins' },
            { step: 2, instruction: 'Cook liver and shrimps', time: '10 mins' },
            { step: 3, instruction: 'Fry rice with vegetables and proteins', time: '15 mins' },
          ],
          cookingTime: '35 minutes',
          servings: 4,
          difficulty: 'Easy',
          cost: '₦1,800',
          category: 'Main Dish',
        },
        {
          id: '5',
          title: 'Okra Soup',
          description: 'Tasty okra soup with palm oil and fish',
          ingredients: [
            { name: 'Okra', quantity: '2 cups' },
            { name: 'Fish', quantity: '1 small' },
            { name: 'Palm Oil', quantity: '1/2 cup' },
            { name: 'Crayfish', quantity: '1 tbsp' },
            { name: 'Onion', quantity: '1' },
            { name: 'Pepper', quantity: '2' },
            { name: 'Maggi', quantity: '1' },
            { name: 'Salt', quantity: 'to taste' },
          ],
          instructions: [
            { step: 1, instruction: 'Wash and chop okra', time: '5 mins' },
            { step: 2, instruction: 'Cook fish in palm oil', time: '10 mins' },
            { step: 3, instruction: 'Add okra and seasonings', time: '15 mins' },
          ],
          cookingTime: '30 minutes',
          servings: 4,
          difficulty: 'Easy',
          cost: '₦1,200',
          category: 'Soup',
        },
      ];

      setGeneratedRecipes(mockRecipes);
    } catch (error: any) {
      setError(error.message || 'Failed to generate recipes');
    } finally {
      setLoading(false);
    }
  };

  const generateMealPlan = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock meal plan data
      const mockMealPlan: MealPlan = {
        id: '1',
        week: 'This Week',
        days: [
          {
            day: 'Monday',
            meals: {
              breakfast: 'Akara and Pap',
              lunch: 'Jollof Rice with Chicken',
              dinner: 'Egusi Soup with Pounded Yam'
            }
          },
          {
            day: 'Tuesday',
            meals: {
              breakfast: 'Bread and Tea',
              lunch: 'Fried Rice with Salad',
              dinner: 'Okra Soup with Garri'
            }
          },
          {
            day: 'Wednesday',
            meals: {
              breakfast: 'Moi Moi',
              lunch: 'Coconut Rice with Beef',
              dinner: 'Banga Soup with Fufu'
            }
          },
          {
            day: 'Thursday',
            meals: {
              breakfast: 'Yam and Egg Sauce',
              lunch: 'Jollof Spaghetti',
              dinner: 'Vegetable Soup with Semolina'
            }
          },
          {
            day: 'Friday',
            meals: {
              breakfast: 'Akamu and Beans',
              lunch: 'Rice and Stew',
              dinner: 'Ogbono Soup with Eba'
            }
          },
          {
            day: 'Saturday',
            meals: {
              breakfast: 'Pancakes',
              lunch: 'Party Jollof Rice',
              dinner: 'Pepper Soup with Yam'
            }
          },
          {
            day: 'Sunday',
            meals: {
              breakfast: 'Indomie and Egg',
              lunch: 'Rice and Stew with Salad',
              dinner: 'Afang Soup with Pounded Yam'
            }
          }
        ],
        shoppingList: [
          {
            category: 'Proteins',
            items: [
              { name: 'Chicken', quantity: '1kg', checked: false },
              { name: 'Beef', quantity: '500g', checked: false },
              { name: 'Fish', quantity: '2 medium', checked: false }
            ]
          },
          {
            category: 'Carbohydrates',
            items: [
              { name: 'Rice', quantity: '5kg', checked: false },
              { name: 'Yam', quantity: '3 tubers', checked: false },
              { name: 'Garri', quantity: '2kg', checked: false }
            ]
          },
          {
            category: 'Vegetables',
            items: [
              { name: 'Tomatoes', quantity: '10 pieces', checked: false },
              { name: 'Pepper', quantity: '1 bunch', checked: false },
              { name: 'Onions', quantity: '5 pieces', checked: false }
            ]
          }
        ]
      };

      setMealPlan(mockMealPlan);
    } catch (error: any) {
      setError(error.message || 'Failed to generate meal plan');
    } finally {
      setLoading(false);
    }
  };

  const clearRecipes = () => {
    setGeneratedRecipes([]);
    setMealPlan(null);
    setError(null);
  };

  const value: RecipeContextType = {
    selectedIngredients,
    generatedRecipes,
    mealPlan,
    loading,
    error,
    setSelectedIngredients,
    generateRecipes,
    generateMealPlan,
    clearRecipes,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipe(): RecipeContextType {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}