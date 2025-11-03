import axios from 'axios';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

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
}

export interface MealPlan {
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

class OpenAIService {
  private async makeRequest(prompt: string): Promise<string> {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Please add EXPO_PUBLIC_OPENAI_API_KEY to your environment variables.');
    }

    try {
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a professional Nigerian chef and nutritionist. Generate authentic Nigerian recipes with detailed ingredients, instructions, and nutritional information. Always respond in valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('OpenAI API Error:', error);

      if (error.response?.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        throw new Error('Network error. Please check your internet connection.');
      } else {
        throw new Error('Failed to generate recipes. Please try again.');
      }
    }
  }

  async generateRecipes(ingredients: string[]): Promise<Recipe[]> {
    const ingredientsList = ingredients.join(', ');

    const prompt = `Generate 5 authentic Nigerian recipes using these ingredients: ${ingredientsList}.

For each recipe, provide:
- A creative Nigerian recipe title
- Brief description (under 100 characters)
- Complete ingredients list with quantities
- Step-by-step cooking instructions with time estimates
- Total cooking time
- Number of servings
- Difficulty level (Easy, Medium, or Hard)
- Estimated cost in Naira
- Recipe category (Main Dish, Soup, etc.)

Format your response as a valid JSON array with this exact structure:
[
  {
    "title": "Recipe Name",
    "description": "Brief description",
    "ingredients": [{"name": "ingredient", "quantity": "amount"}],
    "instructions": [{"step": 1, "instruction": "instruction", "time": "time"}],
    "cookingTime": "total time",
    "servings": 4,
    "difficulty": "Medium",
    "cost": "₦1,500",
    "category": "Main Dish"
  }
]

Focus on authentic Nigerian cuisine and be creative with the ingredient combinations!`;

    try {
      const response = await this.makeRequest(prompt);

      // Try to parse JSON response
      let recipes: Recipe[];
      try {
        recipes = JSON.parse(response);
      } catch (parseError) {
        // If direct parsing fails, try to extract JSON from the response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          recipes = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid response format from OpenAI');
        }
      }

      // Add unique IDs and validate structure
      return recipes.map((recipe, index) => ({
        id: `recipe_${Date.now()}_${index}`,
        title: recipe.title || 'Nigerian Dish',
        description: recipe.description || 'Delicious Nigerian recipe',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
        cookingTime: recipe.cookingTime || '30 minutes',
        servings: recipe.servings || 4,
        difficulty: ['Easy', 'Medium', 'Hard'].includes(recipe.difficulty) ? recipe.difficulty : 'Medium',
        cost: recipe.cost || '₦1,000',
        category: recipe.category || 'Main Dish',
      }));
    } catch (error: any) {
      console.error('Recipe generation error:', error);
      throw error;
    }
  }

  async generateMealPlan(): Promise<MealPlan> {
    const prompt = `Generate a complete 7-day Nigerian meal plan with shopping list.

For each day (Monday to Sunday), provide:
- Breakfast, Lunch, and Dinner - all authentic Nigerian dishes
- Focus on variety and nutritional balance
- Include both traditional and modern Nigerian recipes

Also generate a comprehensive shopping list grouped by categories:
- Proteins (meat, fish, eggs, legumes)
- Carbohydrates (rice, yam, garri, etc.)
- Vegetables & Fruits
- Spices & Seasonings
- Oils & Condiments

Format your response as valid JSON with this structure:
{
  "days": [
    {
      "day": "Monday",
      "meals": {
        "breakfast": "dish name",
        "lunch": "dish name",
        "dinner": "dish name"
      }
    }
  ],
  "shoppingList": [
    {
      "category": "Proteins",
      "items": [
        {"name": "item", "quantity": "amount"}
      ]
    }
  ]
}

Make sure all dishes are authentic Nigerian cuisine!`;

    try {
      const response = await this.makeRequest(prompt);

      let mealPlanData;
      try {
        mealPlanData = JSON.parse(response);
      } catch (parseError) {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          mealPlanData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Invalid response format from OpenAI');
        }
      }

      return {
        id: `mealplan_${Date.now()}`,
        week: 'This Week',
        days: mealPlanData.days || [],
        shoppingList: (mealPlanData.shoppingList || []).map((category: any) => ({
          category: category.category || 'Other',
          items: (category.items || []).map((item: any) => ({
            name: item.name || 'Item',
            quantity: item.quantity || '1 unit',
            checked: false
          }))
        }))
      };
    } catch (error: any) {
      console.error('Meal plan generation error:', error);
      throw error;
    }
  }

  testConnection(): boolean {
    return !!OPENAI_API_KEY;
  }
}

export const openaiService = new OpenAIService();