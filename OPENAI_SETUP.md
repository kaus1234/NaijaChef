# 🔥 OpenAI Setup Guide for SabiCook

This guide will help you set up OpenAI integration for authentic Nigerian recipe generation.

## 🚀 Quick Setup

### 1. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 2. Configure Your API Key

Create a `.env` file in your project root:

```bash
# Create the environment file
touch .env
```

Add your API key to the `.env` file:

```env
# OpenAI API Key for Nigerian recipe generation
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Important:** Replace `sk-your-actual-openai-api-key-here` with your real API key.

### 3. Install and Run

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the app
npm start
```

## 🍳 What You Can Do

### Recipe Generation
- Select 2-10 Nigerian ingredients
- Get 5-6 authentic Nigerian recipes
- Each recipe includes:
  - Traditional Nigerian measurements
  - Step-by-step instructions with timing
  - Cost estimates in Naira (₦)
  - Difficulty levels (Easy, Medium, Hard)

### Meal Planning
- Generate 7-day Nigerian meal plans
- Includes breakfast, lunch, and dinner
- Shopping list organized by categories
- Focuses on seasonal ingredients

## 🛡️ Security & Best Practices

### ✅ Do's
- Keep your API key private
- Add `.env` to `.gitignore` (already done)
- Use a separate test key for development
- Monitor your API usage

### ❌ Don'ts
- Commit your API key to git
- Share your API key publicly
- Use the production key for testing
- Exceed your API quota

## 🔍 Testing the Integration

### Manual Test
1. Open the SabiCook app
2. Select ingredients like "Rice, Tomatoes, Onions"
3. Tap "Generate Recipes"
4. Check if authentic Nigerian recipes appear

### Expected Results
You should see recipes like:
- **Jollof Rice** - Classic Nigerian party favorite
- **Egusi Soup** - Rich melon seed soup
- **Efo Riro** - Nigerian vegetable soup
- **Pounded Yam** - Traditional swallow food

## 🚨 Troubleshooting

### "API Key Not Found"
- Ensure `.env` file exists in project root
- Check that the variable name is exactly `EXPO_PUBLIC_OPENAI_API_KEY`
- Restart the app after adding the key

### "Invalid OpenAI API Key"
- Verify your API key is correct
- Ensure the key is active and has credits
- Check for typos or extra spaces

### "Rate Limit Exceeded"
- Wait a few minutes and try again
- Check your API usage limits
- Consider upgrading your plan

### "Network Error"
- Check your internet connection
- Verify firewall settings
- Try again with better connectivity

## 💰 API Usage & Costs

### Pricing (as of 2024)
- **GPT-3.5-Turbo**: ~$0.002 per 1K tokens
- Typical recipe generation: ~500-800 tokens
- Cost per recipe generation: ~$0.001-0.002

### Usage Tips
- Each recipe request uses ~500-800 tokens
- Meal planning uses ~1000-1500 tokens
- Monitor your usage in the OpenAI dashboard

## 🎯 Features Included

### Recipe Generation
- ✅ Authentic Nigerian dishes only
- ✅ Traditional cooking measurements
- ✅ Cost estimates in Naira
- ✅ Difficulty levels
- ✅ Cooking time estimates
- ✅ Step-by-step instructions

### Error Handling
- ✅ Invalid API key detection
- ✅ Network error handling
- ✅ Rate limit detection
- ✅ JSON parsing validation
- ✅ Fallback error messages

### Nigerian Authenticity
- ✅ Focus on Nigerian cuisine
- ✅ Traditional ingredients
- ✅ Local cooking techniques
- ✅ Cultural food preferences
- ✅ Seasonal considerations

## 📱 App Integration

The OpenAI service is integrated into:

### Context Providers
- `RecipeContext.tsx` - Recipe generation state
- `useRecipe()` hook for component access

### Key Functions
- `generateRecipes()` - Create recipes from ingredients
- `generateMealPlan()` - Create 7-day meal plans
- `validateApiKey()` - Test API key validity

### Error Messages
- User-friendly error messages
- Nigerian context in responses
- Clear troubleshooting guidance

## 🌟 Sample Usage

```javascript
// In your React component
import { useRecipe } from '@/src/context/RecipeContext';

function RecipeGenerator() {
  const { generateRecipes, loading, error } = useRecipe();

  const handleGenerate = async () => {
    await generateRecipes(); // Uses selected ingredients
  };

  return (
    <button onPress={handleGenerate}>
      {loading ? 'Generating...' : 'Generate Nigerian Recipes'}
    </button>
  );
}
```

## 🎉 Ready to Cook!

Once your API key is configured, you'll be able to:
- Generate authentic Nigerian recipes instantly
- Plan weekly Nigerian meal schedules
- Discover new traditional dishes
- Get cost estimates for groceries
- Learn proper Nigerian cooking techniques

Enjoy exploring the rich world of Nigerian cuisine with AI-powered assistance! 🇳🇬🥘