import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRecipe } from '@/src/context/RecipeContext';
import LoadingSpinner from '@/src/components/LoadingSpinner';
import ErrorDisplay from '@/src/components/ErrorDisplay';

export default function MealPlanScreen() {
  const { mealPlan, loading, error, generateMealPlan, clearMealPlan } = useRecipe();
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [expandedShoppingCategories, setExpandedShoppingCategories] = useState<string[]>([]);
  const [checkedShoppingItems, setCheckedShoppingItems] = useState<Set<string>>(new Set());

  const handleGenerateMealPlan = async () => {
    await generateMealPlan();
  };

  const handleClearMealPlan = () => {
    clearMealPlan();
    setExpandedDays([]);
    setExpandedShoppingCategories([]);
    setCheckedShoppingItems(new Set());
  };

  const toggleDayExpansion = (day: string) => {
    setExpandedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const toggleShoppingCategory = (category: string) => {
    setExpandedShoppingCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleShoppingItem = (itemKey: string) => {
    setCheckedShoppingItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const checkAllItems = () => {
    const allItems = mealPlan?.shoppingList.flatMap(category =>
      category.items.map(item => `${category.category}_${item.name}`)
    ) || [];
    setCheckedShoppingItems(new Set(allItems));
  };

  const uncheckAllItems = () => {
    setCheckedShoppingItems(new Set());
  };

  const shareShoppingList = () => {
    const checkedItems = Array.from(checkedShoppingItems);
    if (checkedItems.length === 0) {
      Alert.alert('No Items', 'Please select items to share');
      return;
    }

    const shoppingListText = mealPlan?.shoppingList
      .filter(category =>
        category.items.some(item => checkedItems.includes(`${category.category}_${item.name}`))
      )
      .map(category =>
        `🛒 ${category.category}:\n${category.items
          .filter(item => checkedItems.includes(`${category.category}_${item.name}`))
          .map(item => `  • ${item.quantity} ${item.name}`)
          .join('\n')}`
      )
      .join('\n\n');

    Alert.alert('Share Shopping List', shoppingListText || 'No items selected');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.header}>
        <Text style={styles.headerTitle}>🍴 AI Meal Planner</Text>
        <Text style={styles.headerSubtitle}>
          Generate weekly Nigerian meal plans and shopping lists
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleClearMealPlan} />
        }
      >
        {/* Generate Button */}
        {!mealPlan && !loading && (
          <View style={styles.generateSection}>
            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerateMealPlan}
            >
              <Ionicons name="calendar-outline" size={24} color="#FF6B35" />
              <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#FF6B35" />
              <Text style={styles.infoText}>
                Get a 7-day Nigerian meal timetable with breakfast, lunch, and dinner, plus a complete shopping list.
              </Text>
            </View>
          </View>
        )}

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingSection}>
            <LoadingSpinner
              message="Creating your weekly Nigerian menu..."
              size="large"
            />
          </View>
        )}

        {/* Error Display */}
        {error && (
          <View style={styles.errorSection}>
            <ErrorDisplay
              message={error}
              onRetry={handleGenerateMealPlan}
              type="error"
            />
          </View>
        )}

        {/* Meal Plan Display */}
        {mealPlan && !loading && (
          <View style={styles.mealPlanSection}>
            {/* Header with actions */}
            <View style={styles.mealPlanHeader}>
              <Text style={styles.mealPlanTitle}>📅 Your Weekly Meal Plan</Text>
              <View style={styles.mealPlanActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleGenerateMealPlan}
                >
                  <Ionicons name="refresh" size={18} color="#FF6B35" />
                  <Text style={styles.actionButtonText}>Regenerate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleClearMealPlan}
                >
                  <Ionicons name="trash-outline" size={18} color="#F44336" />
                  <Text style={[styles.actionButtonText, { color: '#F44336' }]}>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Meal Timetable */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🍛 Weekly Timetable</Text>
              {mealPlan.days.map((day) => (
                <View key={day.day} style={styles.dayCard}>
                  <TouchableOpacity
                    style={styles.dayHeader}
                    onPress={() => toggleDayExpansion(day.day)}
                  >
                    <Text style={styles.dayName}>🗓️ {day.day}</Text>
                    <Ionicons
                      name={expandedDays.includes(day.day) ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#FF6B35"
                    />
                  </TouchableOpacity>

                  {expandedDays.includes(day.day) && (
                    <View style={styles.mealsContainer}>
                      <View style={styles.mealItem}>
                        <Text style={styles.mealLabel}>🌅 Breakfast:</Text>
                        <Text style={styles.mealText}>{day.meals.breakfast}</Text>
                      </View>
                      <View style={styles.mealItem}>
                        <Text style={styles.mealLabel}>☀️ Lunch:</Text>
                        <Text style={styles.mealText}>{day.meals.lunch}</Text>
                      </View>
                      <View style={styles.mealItem}>
                        <Text style={styles.mealLabel}>🌙 Dinner:</Text>
                        <Text style={styles.mealText}>{day.meals.dinner}</Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Shopping List */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🛒 Shopping List</Text>
                <View style={styles.shoppingActions}>
                  <TouchableOpacity onPress={checkAllItems}>
                    <Text style={styles.shoppingActionText}>Check All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={uncheckAllItems}>
                    <Text style={styles.shoppingActionText}>Uncheck All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={shareShoppingList}>
                    <Text style={styles.shoppingActionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {mealPlan.shoppingList.map((category) => {
                const isExpanded = expandedShoppingCategories.includes(category.category);
                const categoryItems = category.items.map(item => `${category.category}_${item.name}`);
                const checkedCount = categoryItems.filter(item => checkedShoppingItems.has(item)).length;
                const totalCount = categoryItems.length;

                return (
                  <View key={category.category} style={styles.categoryCard}>
                    <TouchableOpacity
                      style={styles.categoryHeader}
                      onPress={() => toggleShoppingCategory(category.category)}
                    >
                      <View style={styles.categoryInfo}>
                        <Text style={styles.categoryName}>
                          {category.category === 'Proteins' ? '🥩' :
                           category.category === 'Carbohydrates' ? '🍚' :
                           category.category === 'Vegetables' ? '🥬' :
                           category.category === 'Spices' ? '🧂' : '📦'} {category.category}
                        </Text>
                        {checkedCount > 0 && (
                          <View style={styles.checkedCountBadge}>
                            <Text style={styles.checkedCountText}>{checkedCount}/{totalCount}</Text>
                          </View>
                        )}
                      </View>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#FF6B35"
                      />
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.itemsContainer}>
                        {category.items.map((item) => {
                          const itemKey = `${category.category}_${item.name}`;
                          const isChecked = checkedShoppingItems.has(itemKey);

                          return (
                            <TouchableOpacity
                              key={itemKey}
                              style={styles.shoppingItem}
                              onPress={() => toggleShoppingItem(itemKey)}
                            >
                              <View style={[
                                styles.checkbox,
                                isChecked && styles.checkedCheckbox
                              ]}>
                                {isChecked && <Ionicons name="checkmark" size={14} color="#fff" />}
                              </View>
                              <Text style={[
                                styles.itemText,
                                isChecked && styles.checkedItemText
                              ]}>
                                {item.quantity} {item.name}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })}
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
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  generateSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  generateButtonText: {
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    maxWidth: '90%',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
    lineHeight: 20,
    flex: 1,
  },
  loadingSection: {
    paddingVertical: 40,
  },
  errorSection: {
    marginBottom: 20,
  },
  mealPlanSection: {
    flex: 1,
  },
  mealPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mealPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mealPlanActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  shoppingActions: {
    flexDirection: 'row',
    gap: 16,
  },
  shoppingActionText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  dayCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF3F0',
  },
  dayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mealsContainer: {
    padding: 16,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mealLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    width: 80,
  },
  mealText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  categoryCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF3F0',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  checkedCountBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkedCountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemsContainer: {
    padding: 16,
  },
  shoppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedCheckbox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  checkedItemText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});