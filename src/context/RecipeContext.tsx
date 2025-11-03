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

      const recipes = await openaiService.generateRecipes(selectedIngredients);

      setGeneratedRecipes(recipes);
    } catch (error: any) {
      setError(error.message || 'Failed to generate recipes');
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