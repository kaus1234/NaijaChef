import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe, MealPlan, openaiService } from '@/src/services/openai';

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
  clearMealPlan: () => void;
  toggleIngredient: (ingredientId: string) => void;
  saveRecipe: (recipe: Recipe) => void;
  unsaveRecipe: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
}

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const setSelectedIngredientsWithValidation = (ingredients: string[]) => {
    if (ingredients.length > 10) {
      setError('You can select a maximum of 10 ingredients');
      return;
    }
    setSelectedIngredients(ingredients);
    clearError();
  };

  const toggleIngredient = (ingredientId: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId);
      } else {
        if (prev.length >= 10) {
          setError('You can select a maximum of 10 ingredients');
          return prev;
        }
        clearError();
        return [...prev, ingredientId];
      }
    });
  };

  const generateRecipes = async () => {
    try {
      if (selectedIngredients.length < 2) {
        setError('Please select at least 2 ingredients to generate recipes');
        return;
      }

      setLoading(true);
      clearError();

      // First, try real OpenAI generation
      let recipes: Recipe[];
      try {
        recipes = await openaiService.generateRecipes(selectedIngredients);
      setGeneratedRecipes(recipes);
        console.log('Real OpenAI recipes generated successfully');
      } catch (error: any) {
        // Fallback to mock recipes if OpenAI fails
        console.log('OpenAI generation failed, using mock data');

        recipes = [
          {
            id: 'mock_recipe_1',
            title: 'Nigerian Jollof Rice',
            description: 'Perfect jollof rice with chicken and vegetables',
            ingredients: [
              { name: 'Rice', quantity: '2 cups' },
              { name: 'Tomatoes', quantity: '4 medium', category: 'vegetables' },
              { name: 'Onions', quantity: '2 medium', category: 'vegetables' },
              { name: 'Chicken', quantity: '1 whole chicken', category: 'proteins' },
              { name: 'Red Palm Oil', quantity: '1/2 cup', category: 'oils' }
            ],
            instructions: [
              { step: 1, instruction: 'Wash rice in cold water', time: '10 mins' },
              { step: 2, instruction: 'Blend tomatoes and peppers', time: '5 mins' },
              { step: 3, instruction: 'Cook rice in tomato base', time: '15 mins' }
            ],
            cookingTime: '30 minutes',
            servings: 4,
            difficulty: 'Medium',
            cost: '₦1,500',
            category: 'Main Dish'
          },
          {
            id: 'mock_recipe_2',
            title: 'Egusi Soup',
            description: 'Rich melon seed soup with leafy vegetables',
            ingredients: [
              { name: 'Egusi (melon seeds)', quantity: '2 cups' },
              { name: 'Ugu leaves', quantity: '1 bunch', category: 'vegetables' },
              { name: 'Palm Oil', quantity: '1/4 cup' },
              { name: 'Crayfish', quantity: '1 whole fish', category: 'seafood' },
              { name: 'Crayfish', quantity: '2 tablespoons', category: 'seafood' },
              { name: 'Pepper', quantity: '1 tbsp', category: 'spices' }
            ],
            instructions: [
              { step: 1, instruction: 'Blend egusi with crayfish', time: '5 mins' },
              { step: 2, instruction: 'Cook soup to consistency', time: '20 mins' },
              { step: 3, instruction: 'Add crayfish and cook', time: '10 mins' },
              { step: 4, instruction: 'Serve hot with pounded yam', time: '15 mins' }
            ],
            cookingTime: '50 minutes',
            servings: 6,
            difficulty: 'Medium',
            cost: '₦2,000',
            category: 'Soup'
          },
          {
            id: 'mock_recipe_3',
            title: 'Pounded Yam with Egusi Soup',
            description: 'Traditional Nigerian food with rich soup',
            ingredients: [
              { name: 'Yam', quantity: '1 tuber', category: 'carbohydrates' },
              { name: 'Efo Riro', quantity: '1 bunch', category: 'vegetables' },
              { name: 'Red Palm Oil', quantity: '1/4 cup', category: 'oils' },
              { name: 'Pepper', quantity: '1 tsp', category: 'spices' }
            ],
            instructions: [
              { step: 1, instruction: 'Peel and wash yam tuber', time: '5 mins' },
              { step: 2, instruction: 'Boil yam in hot water for 5 minutes', time: '5 mins' },
              { step: 3, instruction: 'Combine with egusi soup', time: '15 mins' }
            ],
            cookingTime: '60 minutes',
            servings: 6,
            difficulty: 'Hard',
            cost: '₦2,000',
            category: 'Main Dish'
          },
          {
            id: 'mock_recipe_4',
            title: 'Nigerian Fried Rice',
            description: 'Perfect party jollof rice with mixed vegetables and fried chicken',
            ingredients: [
              { name: 'Rice', quantity: '3 cups', category: 'carbohydrates' },
              { name: 'Fried Rice', quantity: '2 cups', category: 'carbohydrates' },
              { name: 'Fried Chicken', quantity: '1 whole chicken', category: 'proteins' },
              { name: 'Vegetable Oil', quantity: '2 cups', category: 'oils' },
              { name: 'Pepper', quantity: '2 tbsp', category: 'spices' }
            ],
            instructions: [
              { step: 1, instruction: 'Fry rice until golden', time: '15 mins' },
              { step: 2, instruction: 'Add fried rice', time: '10 mins' },
              { step: 3, instruction: 'Mix vegetables and fry together', time: '5 mins' }
            ],
            cookingTime: '30 minutes',
            servings: 4,
            difficulty: 'Easy',
            cost: '₦1,200',
            category: 'Main Dish'
          },
          {
            id: 'mock_recipe_5',
            title: 'Akara and Beans',
            description: 'Nigerian breakfast combination',
            ingredients: (
              { name: 'Akara', quantity: '1 cup', category: 'breakfast' },
              { name: 'Beans', quantity: '2 cups', category: 'breakfast' },
              { name: 'Pepper Soup', quantity: '2 cups', category: 'breakfast' }
            ),
            instructions: [
              { step: 1, instruction: 'Soak and beans preparation', time: '15 mins' },
              { step: 2, instruction: 'Combine akara and beans', time: '5 mins' },
              { step: 3, instruction: 'Serve hot with fried plantain and pepper soup', time: '5 mins' }
            ],
            cookingTime: '20 minutes',
            servings: 2,
            difficulty: 'Easy',
            cost: '₦800'
          }
        ];
        setGeneratedRecipes(recipes);
        console.log('Using mock recipes while OpenAI is unavailable');
        setError(null);
      }
      }
    } catch (error: any) {
      console.log('Error generating recipes:', error.message);
      setError(error.message || 'Failed to generate recipes');
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const generateMealPlan = async () => {
    try {
      setLoading(true);
      clearError();

      const plan = await openaiService.generateMealPlan();

      setMealPlan(plan);
    } catch (error: any) {
      setError(error.message || 'Failed to generate meal plan');
    } finally {
      setLoading(false);
    }
  };

  const clearRecipes = () => {
    setGeneratedRecipes([]);
    clearError();
  };

  const clearMealPlan = () => {
    setMealPlan(null);
    clearError();
  };

  const saveRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      const exists = prev.find(r => r.id === recipe.id);
      if (!exists) {
        return [...prev, recipe];
      }
      return prev;
    });
  };

  const unsaveRecipe = (recipeId: string) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const isRecipeSaved = (recipeId: string): boolean => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  const value: RecipeContextType = {
    selectedIngredients,
    generatedRecipes,
    mealPlan,
    loading,
    error,
    setSelectedIngredients: setSelectedIngredientsWithValidation,
    generateRecipes,
    generateMealPlan,
    clearRecipes,
    clearMealPlan,
    toggleIngredient,
    saveRecipe,
    unsaveRecipe,
    isRecipeSaved,
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