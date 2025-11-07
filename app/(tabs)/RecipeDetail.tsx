import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '@/src/services/openai';
import { useRecipe } from '@/src/context/RecipeContext';

export default function RecipeDetailScreen() {
  const { recipe: recipeParam } = useLocalSearchParams<{ recipe: string }>();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useRecipe();

  let recipe: Recipe;
  try {
    recipe = JSON.parse(recipeParam || '{}');
  } catch (error) {
    Alert.alert('Error', 'Invalid recipe data');
    router.back();
    return null;
  }

  const handleSaveRecipe = () => {
    if (isRecipeSaved(recipe.id)) {
      unsaveRecipe(recipe.id);
    } else {
      saveRecipe(recipe);
    }
  };

  const toggleIngredientCheck = (index: number) => {
    setCheckedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleStepComplete = (index: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#10B981';
      case 'Medium':
        return '#F59E0B';
      case 'Hard':
        return '#EF4444';
      default:
        return '#F59E0B';
    }
  };

  const shareRecipe = () => {
    Alert.alert('Share Recipe', 'This feature will be available in a future update!');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#10B981', '#059669']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} onPress={shareRecipe}>
              <Ionicons name="share-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSaveRecipe}>
              <Ionicons
                name={isRecipeSaved(recipe.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={isRecipeSaved(recipe.id) ? '#EF4444' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipe Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.metaContainer}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(recipe.difficulty) }]}>
              <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={18} color="#fff" />
              <Text style={styles.metaText}>{recipe.cookingTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={18} color="#fff" />
              <Text style={styles.metaText}>{recipe.servings} servings</Text>
            </View>
          </View>
          <Text style={styles.description}>{recipe.description}</Text>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['ingredients', 'instructions', 'nutrition'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Ionicons
              name={
                tab === 'ingredients' ? 'basket-outline' :
                tab === 'instructions' ? 'list-outline' : 'restaurant-outline'
              }
              size={20}
              color={activeTab === tab ? '#FFFFFF' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ingredients Tab */}
        {activeTab === 'ingredients' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🧂 Ingredients</Text>
              <TouchableOpacity onPress={() => setCheckedIngredients(new Set())}>
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>

            {recipe.ingredients.map((ingredient, index) => (
              <TouchableOpacity
                key={index}
                style={styles.ingredientItem}
                onPress={() => toggleIngredientCheck(index)}
              >
                <View style={[
                  styles.checkbox,
                  checkedIngredients.has(index) && styles.checkedCheckbox,
                ]}>
                  {checkedIngredients.has(index) && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={[
                  styles.ingredientText,
                  checkedIngredients.has(index) && styles.checkedIngredientText,
                ]}>
                  {ingredient.quantity} {ingredient.name}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addToShoppingListButton}>
              <Ionicons name="cart-outline" size={20} color="#F97316" />
              <Text style={styles.addToShoppingListText}>Add to Shopping List</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>👨‍🍳 Cooking Instructions</Text>
              <TouchableOpacity onPress={() => setCompletedSteps(new Set())}>
                <Text style={styles.clearButtonText}>Reset Progress</Text>
              </TouchableOpacity>
            </View>

            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.stepContainer}>
                <TouchableOpacity
                  style={[
                    styles.stepNumber,
                    completedSteps.has(index) && styles.completedStepNumber,
                  ]}
                  onPress={() => toggleStepComplete(index)}
                >
                  {completedSteps.has(index) ? (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.stepContent}>
                  <Text style={[
                    styles.stepInstruction,
                    completedSteps.has(index) && styles.completedStepText,
                  ]}>
                    {instruction.instruction}
                  </Text>
                  {instruction.time && (
                    <View style={styles.stepTime}>
                      <Ionicons name="time-outline" size={14} color="#6B7280" />
                      <Text style={styles.stepTimeText}>{instruction.time}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Progress: {completedSteps.size} of {recipe.instructions.length} steps completed
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(completedSteps.size / recipe.instructions.length) * 100}%` }
                  ]}
                />
              </View>
            </View>
          </View>
        )}

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>🥗 Nutrition Information</Text>

            <View style={styles.nutritionCard}>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Estimated Cost:</Text>
                <Text style={styles.nutritionValue}>{recipe.cost}</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Category:</Text>
                <Text style={styles.nutritionValue}>{recipe.category}</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Difficulty:</Text>
                <Text style={[styles.nutritionValue, { color: getDifficultyColor(recipe.difficulty) }]}>
                  {recipe.difficulty}
                </Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Prep Time:</Text>
                <Text style={styles.nutritionValue}>{recipe.cookingTime}</Text>
              </View>
              <View style={[styles.nutritionRow, styles.lastNutritionRow]}>
                <Text style={styles.nutritionLabel}>Servings:</Text>
                <Text style={styles.nutritionValue}>{recipe.servings}</Text>
              </View>
            </View>

            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                Note: Nutritional information is estimated and may vary based on exact ingredients and portion sizes.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#ECFDF5',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContent: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedCheckbox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  ingredientText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  checkedIngredientText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  addToShoppingListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#F97316',
  },
  addToShoppingListText: {
    color: '#F97316',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  completedStepNumber: {
    backgroundColor: '#10B981',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  stepContent: {
    flex: 1,
  },
  stepInstruction: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
  },
  completedStepText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  stepTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepTimeText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  progressText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  nutritionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lastNutritionRow: {
    borderBottomWidth: 0,
  },
  nutritionLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  nutritionValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  disclaimer: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});