import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRecipe } from '@/src/context/RecipeContext';

export default function MealPlanScreen() {
  const { mealPlan, generateMealPlan, loading, error } = useRecipe();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleGenerateMealPlan = async () => {
    try {
      await generateMealPlan();
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleShoppingItem = (categoryIndex: number, itemIndex: number) => {
    // This would update the shopping list item state
    // For now, we'll just log it
    console.log(`Toggle item: ${categoryIndex}-${itemIndex}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Modern Header */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>🍴 AI Meal Planner</Text>
            <Text style={styles.headerSubtitle}>
              Generate authentic Nigerian weekly meal plans
            </Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>21</Text>
              <Text style={styles.statLabel}>Meals</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>Variations</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Generate Section */}
        {!mealPlan && !loading && (
          <View style={styles.generateSection}>
            <View style={styles.generateCard}>
              <Text style={styles.generateTitle}>Create Your Weekly Menu</Text>
              <Text style={styles.generateDescription}>
                Get a complete 7-day Nigerian meal plan with breakfast, lunch, dinner, and a comprehensive shopping list.
              </Text>

              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGenerateMealPlan}
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.generateButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.generateButtonText}>Generate AI Meal Plan</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Authentic Nigerian dishes</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Breakfast, lunch & dinner</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Complete shopping list</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.featureText}>Nutritional balance</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingSection}>
            <View style={styles.loadingCard}>
              <View style={styles.loadingAnimation}>
                <Text style={styles.loadingEmoji}>🍳</Text>
                <Text style={styles.loadingText}>Creating your weekly Nigerian menu...</Text>
                <Text style={styles.loadingSubtext}>Our AI is planning authentic dishes for you</Text>
              </View>
            </View>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View style={styles.errorSection}>
            <View style={styles.errorCard}>
              <Ionicons name="warning" size={24} color="#EF4444" />
              <Text style={styles.errorTitle}>Generation Failed</Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleGenerateMealPlan}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Meal Plan Display */}
        {mealPlan && (
          <View style={styles.mealPlanSection}>
            <View style={styles.mealPlanHeader}>
              <Text style={styles.mealPlanTitle}>📅 {mealPlan.week}</Text>
              <Text style={styles.mealPlanSubtitle}>
                Your personalized Nigerian meal plan
              </Text>
            </View>

            {/* Days */}
            <View style={styles.daysContainer}>
              {mealPlan.days.map((day, index) => (
                <View key={index} style={styles.dayCard}>
                  <TouchableOpacity
                    style={styles.dayHeader}
                    onPress={() => toggleDay(day.day)}
                  >
                    <View style={styles.dayInfo}>
                      <Text style={styles.dayName}>{day.day}</Text>
                      <Text style={styles.dayDate}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </Text>
                    </View>
                    <View style={styles.dayToggle}>
                      <Text style={styles.toggleIcon}>
                        {expandedDay === day.day ? '▼' : '▶'}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {expandedDay === day.day && (
                    <View style={styles.mealsContainer}>
                      <View style={styles.mealItem}>
                        <View style={styles.mealHeader}>
                          <Ionicons name="sunny-outline" size={16} color="#F59E0B" />
                          <Text style={styles.mealLabel}>Breakfast</Text>
                        </View>
                        <Text style={styles.mealName}>{day.meals.breakfast}</Text>
                      </View>

                      <View style={styles.mealItem}>
                        <View style={styles.mealHeader}>
                          <Ionicons name="partly-sunny-outline" size={16} color="#F59E0B" />
                          <Text style={styles.mealLabel}>Lunch</Text>
                        </View>
                        <Text style={styles.mealName}>{day.meals.lunch}</Text>
                      </View>

                      <View style={styles.mealItem}>
                        <View style={styles.mealHeader}>
                          <Ionicons name="moon-outline" size={16} color="#6366F1" />
                          <Text style={styles.mealLabel}>Dinner</Text>
                        </View>
                        <Text style={styles.mealName}>{day.meals.dinner}</Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Shopping List */}
            <View style={styles.shoppingSection}>
              <View style={styles.shoppingHeader}>
                <Text style={styles.shoppingTitle}>🛒 Shopping List</Text>
                <Text style={styles.shoppingSubtitle}>
                  All ingredients for your weekly meals
                </Text>
              </View>

              {mealPlan.shoppingList.map((category, categoryIndex) => (
                <View key={categoryIndex} style={styles.categoryCard}>
                  <TouchableOpacity
                    style={styles.categoryHeader}
                    onPress={() => toggleCategory(category.category)}
                  >
                    <Text style={styles.categoryTitle}>{category.category}</Text>
                    <Text style={styles.categoryToggle}>
                      {expandedCategory === category.category ? '▼' : '▶'}
                    </Text>
                  </TouchableOpacity>

                  {expandedCategory === category.category && (
                    <View style={styles.itemsList}>
                      {category.items.map((item, itemIndex) => (
                        <TouchableOpacity
                          key={itemIndex}
                          style={styles.shoppingItem}
                          onPress={() => toggleShoppingItem(categoryIndex, itemIndex)}
                        >
                          <View style={styles.itemCheckbox}>
                            <View style={[
                              styles.checkbox,
                              item.checked && styles.checkboxChecked
                            ]}>
                              {item.checked && (
                                <Text style={styles.checkmark}>✓</Text>
                              )}
                            </View>
                          </View>
                          <Text style={[
                            styles.itemName,
                            item.checked && styles.itemNameChecked
                          ]}>
                            {item.name}
                          </Text>
                          <Text style={styles.itemQuantity}>{item.quantity}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.checkAllButton}>
                  <Ionicons name="checkmark-done" size={20} color="#10B981" />
                  <Text style={styles.checkAllText}>Check All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>
                  <Ionicons name="share-outline" size={20} color="#6366F1" />
                  <Text style={styles.shareText}>Share List</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Regenerate Button */}
            <View style={styles.regenerateSection}>
              <TouchableOpacity
                style={styles.regenerateButton}
                onPress={handleGenerateMealPlan}
              >
                <Ionicons name="refresh" size={20} color="#10B981" />
                <Text style={styles.regenerateText}>Generate New Plan</Text>
              </TouchableOpacity>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
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
  generateSection: {
    padding: 20,
  },
  generateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  generateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  generateDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  generateButton: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  generateButtonGradient: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
  },
  loadingSection: {
    padding: 20,
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingAnimation: {
    alignItems: 'center',
  },
  loadingEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  errorSection: {
    padding: 20,
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 15,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  mealPlanSection: {
    padding: 20,
  },
  mealPlanHeader: {
    marginBottom: 20,
  },
  mealPlanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  mealPlanSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  daysContainer: {
    marginBottom: 30,
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  dayDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  dayToggle: {
    padding: 5,
  },
  toggleIcon: {
    fontSize: 16,
    color: '#6B7280',
  },
  mealsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  mealItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  mealLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  mealName: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  shoppingSection: {
    marginBottom: 20,
  },
  shoppingHeader: {
    marginBottom: 15,
  },
  shoppingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  shoppingSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    fontWeight: 'bold',
    color: '#1F2937',
  },
  categoryToggle: {
    fontSize: 16,
    color: '#6B7280',
  },
  itemsList: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  shoppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemCheckbox: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
  },
  itemNameChecked: {
    textDecorationLineThrough: 'line-through',
    color: '#9CA3AF',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 15,
  },
  checkAllButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    paddingVertical: 12,
  },
  checkAllText: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    paddingVertical: 12,
  },
  shareText: {
    color: '#6366F1',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  regenerateSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  regenerateText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});