import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Recipe, useRecipe } from '@/src/context/RecipeContext';
import { router } from 'expo-router';

export default function RecipeListScreen() {
  const { generatedRecipes } = useRecipe();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'breakfast' | 'lunch' | 'dinner'>('all');

  const filteredRecipes = React.useMemo(() => {
    if (!generatedRecipes || generatedRecipes.length === 0) {
      return [];
    }
    return generatedRecipes.filter(recipe => {
      if (selectedCategory === 'all') return true;
      return recipe.category === selectedCategory;
    });
  }, [generatedRecipes, selectedCategory]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleRecipeDetail = (recipe: Recipe) => {
    router.push({
      pathname: '/RecipeDetail',
      params: { recipe: JSON.stringify(recipe) }
    });
  };

  const renderRecipeCard = ({ item, index }: { item: Recipe; index: number }) => {
    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => handleRecipeDetail(item)}
      >
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeMeta}>
          <View style={styles.recipeMetaItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>{item.cookingTime}</Text>
          </View>
          <View style={styles.recipeMetaItem}>
            <Ionicons name="people-outline" size={16} color="#9CA3AF" />
            <Text style={[styles.metaText, { color: '#4CAF50'}]}>
              {item.servings} servings
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍴</Text>
      <Text style={styles.emptyTitle}>No recipes generated yet</Text>
      <Text style={styles.emptyDescription}>
        Select 2+ ingredients and generate some amazing Nigerian recipes!
      </Text>
      <TouchableOpacity
        style={styles.generateButton}
        onPress={() => router.push('/')}>
        <Text style={styles.generateButtonText}>Generate Recipes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🍴 Recipe Collection</Text>
          <Text style={styles.headerSubtitle}>
            {generatedRecipes.length} recipes available
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {['all', 'breakfast', 'lunch', 'dinner'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterTab,
              selectedCategory === category && styles.activeFilterTab,
            ]}
            onPress={() => setSelectedCategory(category as any)}
          >
            <Text style={[
              styles.filterTabText,
              selectedCategory === category && styles.activeFilterTabText,
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recipe List */}
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.recipesList}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      {/* Refresh Button */}
      <View style={styles.refreshContainer}>
        <TouchableOpacity
          style={[
            styles.refreshButton,
            refreshing && styles.refreshButtonDisabled,
          ]}
          onPress={handleRefresh}
          disabled={refreshing}
        >
          <Ionicons
            name="refresh-circle-outline"
            size={16}
            color={refreshing ? '#FFFFFF' : '#9CA3AF'}
          />
          <Text style={[
            styles.refreshButtonText,
            refreshing && styles.refreshButtonDisabledText,
          ]}>
            {refreshing ? 'Refreshing...' : 'Refresh Recipes'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterTab: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#10B981',
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#10B981',
    borderBottomWidth: 2,
    borderBottomColor: '#10B981',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  refreshContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  refreshButtonDisabled: {
    opacity: 0.5,
  },
  refreshButtonDisabledText: {
    color: '#FFFFFF',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipesList: {
    padding: 16,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 14,
  },
});

export default RecipeListScreen;