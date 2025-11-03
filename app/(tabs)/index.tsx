import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRecipe } from '@/src/context/RecipeContext';
import { useAuth } from '@/src/context/AuthContext';
import { getAllIngredients } from '@/src/data/ingredients';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const {
    selectedIngredients,
    generateRecipes,
    loading,
    error,
    setSelectedIngredients,
    generatedRecipes
  } = useRecipe();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Filter ingredients based on search
  const filteredIngredients = allIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group ingredients by category
  const ingredientsByCategory = filteredIngredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, typeof allIngredients>);

  const handleGenerateRecipes = async () => {
    try {
      await generateRecipes();
      // Navigate to recipe results or show in current screen
    } catch (error) {
      console.error('Error generating recipes:', error);
    }
  };

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Modern Header */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>
                Hello, {user?.name ? user.name.split(' ')[0] : 'Chef'}! 👨‍🍳
              </Text>
              <Text style={styles.subtitle}>
                Create amazing Nigerian dishes with AI
              </Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={handleSignOut}>
              <Text style={styles.profileText}>👤</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>58</Text>
              <Text style={styles.statLabel}>Ingredients</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>AI</Text>
              <Text style={styles.statLabel}>Powered</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Search ingredients..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedTitle}>Selected ({selectedIngredients.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.selectedList}>
                {selectedIngredients.map((ingredient, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.selectedChip}
                    onPress={() => toggleIngredient(ingredient)}
                  >
                    <Text style={styles.selectedChipText}>{ingredient}</Text>
                    <Text style={styles.removeIcon}>×</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Ingredients Categories */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>🥘 Choose Your Ingredients</Text>

          {Object.entries(ingredientsByCategory).map(([category, items]) => (
            <View key={category} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => toggleCategory(category)}
              >
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryToggle}>
                  {expandedCategory === category ? '▼' : '▶'}
                </Text>
              </TouchableOpacity>

              {expandedCategory === category && (
                <View style={styles.ingredientsGrid}>
                  {items.map((ingredient, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.ingredientChip,
                        selectedIngredients.includes(ingredient.name) && styles.selectedIngredientChip
                      ]}
                      onPress={() => toggleIngredient(ingredient.name)}
                    >
                      <Text style={styles.ingredientIcon}>{ingredient.icon}</Text>
                      <Text style={[
                        styles.ingredientName,
                        selectedIngredients.includes(ingredient.name) && styles.selectedIngredientName
                      ]}>
                        {ingredient.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Generate Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.generateButton,
              loading && styles.disabledButton,
              selectedIngredients.length < 2 && styles.disabledButton
            ]}
            onPress={handleGenerateRecipes}
            disabled={loading || selectedIngredients.length < 2}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.generateButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.generateButtonText}>
                {loading ? '🤖 Creating Magic...' : '🍳 Generate Recipes'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {selectedIngredients.length < 2 && (
            <Text style={styles.helperText}>
              Select at least 2 ingredients to generate recipes
            </Text>
          )}
        </View>

        {/* Generated Recipes Preview */}
        {generatedRecipes.length > 0 && (
          <View style={styles.recipesContainer}>
            <Text style={styles.sectionTitle}>🍽️ Your Generated Recipes</Text>
            {generatedRecipes.slice(0, 3).map((recipe, index) => (
              <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
                <View style={styles.recipeHeader}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <Text style={styles.recipeTime}>⏱️ {recipe.cookingTime}</Text>
                </View>
                <Text style={styles.recipeDescription}>{recipe.description}</Text>
                <View style={styles.recipeMeta}>
                  <Text style={styles.recipeDifficulty}>
                    {recipe.difficulty === 'Easy' ? '🟢' : recipe.difficulty === 'Medium' ? '🟡' : '🔴'} {recipe.difficulty}
                  </Text>
                  <Text style={styles.recipeCost}>{recipe.cost}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {generatedRecipes.length > 3 && (
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => router.push('/RecipeDetail')}
              >
                <Text style={styles.viewAllButtonText}>View All Recipes ({generatedRecipes.length})</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 10,
  },
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedChip: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedChipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
  },
  removeIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  errorText: {
    color: '#991B1B',
    fontSize: 14,
  },
  ingredientsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9FAFB',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  categoryToggle: {
    fontSize: 16,
    color: '#6B7280',
  },
  ingredientsGrid: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ingredientChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
  },
  selectedIngredientChip: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  ingredientIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  ingredientName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedIngredientName: {
    color: '#6366F1',
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  generateButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  generateButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helperText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    marginTop: 10,
  },
  recipesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 10,
  },
  recipeTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
    lineHeight: 20,
  },
  recipeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeDifficulty: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  recipeCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  viewAllButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});