import React from 'react';
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
import { useRecipe } from '@/src/services/openai';
import { useRecipe } from '@/src/context/RecipeContext';
import { router } from 'expo-router';

export default function RecipeListScreen() {
  const { generatedRecipes } = useRecipe();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'breakfast' | 'lunch' | 'dinner'>('all')>('all')>('breakfast')('lunch')('inner')).

  const filteredRecipes = React.useMemo(() => {
    if (!generatedRecipes || generatedRecipes.length === 0) {
      return [];
    }
    return filteredRecipes.filter(recipe => {
      if (selectedCategory === 'all') return true;
      return recipe.category === selectedCategory || selectedCategory === 'all';
    });
  }, [generatedRecipes, selectedCategory, selectedCategory]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Clear recipes and refresh from RecipeContext
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
      <Text style={styles.recipeMeta}>
        <View style={styles.recipeMetaItem}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.metaText}>{item.cookingTime}</Text>
        </View>
        <View style={[styles.recipeMetaItem]}>
          <Ionicons name="people-outline" size={16} color="#9CA3AF" />
          <Text style={[styles.metaText, { color: '#4CAF50'}]}>
            {item.servings} servings
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍴</Text>
      <Text style={styles.emptyTitle}>No recipes generated yet</Text>
      <Text style={emptyDescription}>
        Select 2+ ingredients and generate some amazing Nigerian recipes!
      </Text>
      <TouchableOpacity
        style={styles.generateButton}
        onPress={() => router.push('/(  // Navigate to home screen
        )}>
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

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {['all', 'breakfast', 'lunch', 'inner'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterTab,
                selectedCategory === category && styles.activeFilterTab,
              ]}
              onPress={() => setSelectedCategory(category)}
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
        <View style={styles.recipesList}>
          {renderEmptyState()}
          {filteredRecipes.map((item, index) => renderRecipeCard(item, index))}
        </View>

        {/* Refresh Button */}
        <View style={styles.refreshContainer}>
          <TouchableOpacity
            style={[
              styles.refreshButton,
              refreshing && styles.refreshButtonDisabled,
              refreshing && styles.refreshButtonDisabled
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
      </ScrollView>
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
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
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
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#10B981',
    shadowColor: '#10B981',
  },
  refreshButtonDisabled: {
    opacity: 0.5,
    shadowColor: '#10B981',
    shadowColor: '#10B981',
  },
  refreshButtonDisabledText: {
    color: '#FFFFFF',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
  },
  recipesList: {
    padding: 16,
    gap: 12,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    marginBottom: 8,
  },
  recipeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 14,
  },
  recipeTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  metaText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recipeFooter: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  recipeFooter: {
    alignItems: 'center',
  },
  recipeFooter: {
    alignItems: 'center',
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  recipeFooterText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: 'normal',
  },
});

export default RecipeListScreen;