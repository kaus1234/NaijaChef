import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRecipe } from '@/src/context/RecipeContext';
import { useAuth } from '@/src/context/AuthContext';
import IngredientSelector from '@/src/components/IngredientSelector';
import RecipeCard from '@/src/components/RecipeCard';
import LoadingSpinner from '@/src/components/LoadingSpinner';
import ErrorDisplay from '@/src/components/ErrorDisplay';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const {
    selectedIngredients,
    generatedRecipes,
    loading,
    error,
    generateRecipes,
    clearRecipes,
    toggleIngredient,
    isRecipeSaved,
    saveRecipe,
    unsaveRecipe,
  } = useRecipe();

  const handleGenerateRecipes = async () => {
    await generateRecipes();
  };

  const handleRecipePress = (recipe: any) => {
    router.push({
      pathname: '/RecipeDetail',
      params: { recipe: JSON.stringify(recipe) }
    });
  };

  const handleClearRecipes = () => {
    clearRecipes();
  };

  const canGenerate = selectedIngredients.length >= 2;

  return (
    <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleClearRecipes} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>
                {user?.name ? `Welcome back, ${user.name.split(' ')[0]}! 👋` : 'Welcome! 👋'}
              </Text>
              <Text style={styles.subtitle}>
                What Nigerian dish would you like to cook today?
              </Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={signOut}>
              <Text style={styles.profileText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ingredient Selection */}
        <View style={styles.ingredientSection}>
          <IngredientSelector
            selectedIngredients={selectedIngredients}
            onToggleIngredient={toggleIngredient}
            maxSelections={10}
          />
        </View>

        {/* Generate Button */}
        {selectedIngredients.length > 0 && (
          <View style={styles.generateSection}>
            <TouchableOpacity
              style={[
                styles.generateButton,
                !canGenerate && styles.disabledGenerateButton,
                loading && styles.loadingGenerateButton,
              ]}
              onPress={handleGenerateRecipes}
              disabled={!canGenerate || loading}
            >
              <Text style={styles.generateButtonText}>
                {loading ? 'Generating Recipes...' : `🍳 Generate Recipes (${selectedIngredients.length} ingredients)`}
              </Text>
            </TouchableOpacity>

            {selectedIngredients.length < 2 && (
              <Text style={styles.helperText}>
                Select at least 2 ingredients to generate recipes
              </Text>
            )}
          </View>
        )}

        {/* Error Display */}
        {error && (
          <View style={styles.errorSection}>
            <ErrorDisplay
              message={error}
              onRetry={handleGenerateRecipes}
              type="error"
            />
          </View>
        )}

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingSection}>
            <LoadingSpinner
              message="Generating delicious Nigerian recipes..."
              size="large"
            />
          </View>
        )}

        {/* Generated Recipes */}
        {generatedRecipes.length > 0 && !loading && (
          <View style={styles.recipesSection}>
            <View style={styles.recipesHeader}>
              <Text style={styles.recipesTitle}>
                🍛 Generated Recipes ({generatedRecipes.length})
              </Text>
              <TouchableOpacity onPress={handleClearRecipes}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>

            {generatedRecipes.map((recipe, index) => (
              <RecipeCard
                key={`${recipe.id}-${index}`}
                recipe={recipe}
                onPress={() => handleRecipePress(recipe)}
                onSave={() => isRecipeSaved(recipe.id) ? unsaveRecipe(recipe.id) : saveRecipe(recipe)}
                isSaved={isRecipeSaved(recipe.id)}
                showSaveButton={true}
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {selectedIngredients.length === 0 && generatedRecipes.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateContent}>
              <Text style={styles.emptyStateIcon}>🥘</Text>
              <Text style={styles.emptyStateTitle}>Ready to Cook?</Text>
              <Text style={styles.emptyStateDescription}>
                Select ingredients you have at home and let AI generate authentic Nigerian recipes for you!
              </Text>

              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>💡 Popular Ingredients:</Text>
                <View style={styles.popularIngredients}>
                  {['Rice 🍚', 'Tomatoes 🍅', 'Onions 🧅', 'Chicken 🍗', 'Plantain 🍌'].map((ingredient) => (
                    <View key={ingredient} style={styles.popularIngredient}>
                      <Text style={styles.popularIngredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Bottom padding for safe area */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '80%',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
  },
  ingredientSection: {
    marginBottom: 20,
  },
  generateSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  disabledGenerateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowOpacity: 0.1,
  },
  loadingGenerateButton: {
    backgroundColor: '#f0f0f0',
  },
  generateButtonText: {
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helperText: {
    marginTop: 10,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  errorSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  loadingSection: {
    marginVertical: 40,
  },
  recipesSection: {
    marginBottom: 20,
  },
  recipesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  recipesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  emptyState: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyStateContent: {
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  suggestionsContainer: {
    width: '100%',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  popularIngredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  popularIngredient: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  popularIngredientText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});