import axios from 'axios';
import Constants from 'expo-constants';

const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiApiKey || process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. Please set EXPO_PUBLIC_OPENAI_API_KEY in your environment variables.');
}

export interface Recipe {
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
  image?: string;
}

export interface MealPlan {
  id: string;
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
    items: { name: string; quantity: string }[];
  }[];
  createdAt: string;
}

class OpenAIService {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = OPENAI_API_KEY;
  }

  private async makeRequest(prompt: string, maxTokens: number = 2000): Promise<any> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a Nigerian cuisine expert. Always provide authentic Nigerian recipes and meal plans. Use proper Nigerian measurements and cooking techniques. Return responses in valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('OpenAI API Error:', error.response?.data || error.message);

      if (error.response?.status === 401) {
        throw new Error('Invalid OpenAI API key');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('Failed to generate response. Please try again.');
      }
    }
  }

  async generateRecipes(ingredients: string[]): Promise<Recipe[]> {
    if (ingredients.length < 2) {
      throw new Error('Please select at least 2 ingredients');
    }

    if (ingredients.length > 10) {
      throw new Error('Please select 10 or fewer ingredients');
    }

    const prompt = `
Generate 5-6 authentic Nigerian recipes that can be made with these ingredients: ${ingredients.join(', ')}.

For each recipe, provide:
1. Title (authentic Nigerian dish name)
2. Brief description
3. Complete ingredients list with Nigerian measurements (cups, tablespoons, cooking spoons, etc.)
4. Step-by-step cooking instructions with time estimates
5. Total cooking time
6. Number of servings
7. Difficulty level (Easy, Medium, Hard)
8. Estimated cost in Naira (₦)

Return as a JSON array with this structure:
{
  "recipes": [
    {
      "title": "Jollof Rice",
      "description": "Classic Nigerian jollof rice",
      "ingredients": [
        {"name": "Rice", "quantity": "2 cups"},
        {"name": "Tomatoes", "quantity": "4 medium"}
      ],
      "instructions": [
        {"step": 1, "instruction": "Parboil rice for 10 minutes", "time": "10 mins"},
        {"step": 2, "instruction": "Blend tomatoes and peppers", "time": "5 mins"}
      ],
      "cookingTime": "45 minutes",
      "servings": 4,
      "difficulty": "Medium",
      "cost": "₦1,500",
      "category": "Main Dish"
    }
  ]
}

Ensure all recipes are authentic Nigerian dishes and use proper Nigerian cooking measurements.
`;

    try {
      const response = await this.makeRequest(prompt);
      const content = response.choices[0].message.content;

      // Parse JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const data = JSON.parse(jsonMatch[0]);
      const recipes = data.recipes || [];

      // Add unique IDs and ensure all required fields
      return recipes.map((recipe: any, index: number) => ({
        id: `recipe_${Date.now()}_${index}`,
        title: recipe.title || 'Untitled Recipe',
        description: recipe.description || 'No description available',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        cookingTime: recipe.cookingTime || 'Unknown',
        servings: recipe.servings || 4,
        difficulty: recipe.difficulty || 'Medium',
        cost: recipe.cost || '₦0',
        category: recipe.category || 'Main Dish',
        image: undefined, // Can be added later
      }));
    } catch (error: any) {
      console.error('Recipe generation error:', error);
      throw new Error(error.message || 'Failed to generate recipes');
    }
  }

  async generateMealPlan(): Promise<MealPlan> {
    const prompt = `
Generate a comprehensive 7-day Nigerian meal timetable with shopping list.

Requirements:
1. 7 days (Monday to Sunday)
2. Each day: Breakfast, Lunch, Dinner
3. Focus on authentic Nigerian dishes
4. Include variety and balanced nutrition
5. Consider seasonal ingredients
6. Group shopping list by categories

Return as JSON with this structure:
{
  "mealPlan": {
    "days": [
      {
        "day": "Monday",
        "meals": {
          "breakfast": "Akamu and Akara",
          "lunch": "Jollof Rice with Chicken",
          "dinner": "Efo Riro with Pounded Yam"
        }
      }
    ],
    "shoppingList": [
      {
        "category": "Proteins",
        "items": [
          {"name": "Chicken", "quantity": "1kg"},
          {"name": "Eggs", "quantity": "6 pieces"}
        ]
      },
      {
        "category": "Carbohydrates",
        "items": [
          {"name": "Rice", "quantity": "2kg"},
          {"name": "Yam", "quantity": "1 large tuber"}
        ]
      }
    ]
  }
}

Ensure all dishes are authentic Nigerian meals and shopping list quantities are appropriate for one person for one week.
`;

    try {
      const response = await this.makeRequest(prompt, 3000);
      const content = response.choices[0].message.content;

      // Parse JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const data = JSON.parse(jsonMatch[0]);
      const mealPlanData = data.mealPlan;

      return {
        id: `mealplan_${Date.now()}`,
        days: mealPlanData.days || [],
        shoppingList: mealPlanData.shoppingList || [],
        createdAt: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error('Meal plan generation error:', error);
      throw new Error(error.message || 'Failed to generate meal plan');
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      await this.makeRequest('Test message - respond with "OK"', 50);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const openaiService = new OpenAIService();
export default openaiService;