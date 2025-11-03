import React, { createContext, useContext, useState, ReactNode } from 'react';
import { openaiService, Recipe, MealPlan } from '@/src/services/openai';

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

      // Use real OpenAI API
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
      setError(null);

      // Use real OpenAI API for meal planning
      const mealPlanData = await openaiService.generateMealPlan();
      setMealPlan(mealPlanData);
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