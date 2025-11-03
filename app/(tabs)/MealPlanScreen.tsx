import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRecipe } from '@/src/context/RecipeContext';

export default function MealPlanScreen() {
  const { mealPlan, generateMealPlan, loading } = useRecipe();

  const handleGenerateMealPlan = async () => {
    await generateMealPlan();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.header}>
        <Text style={styles.headerTitle}>🍴 AI Meal Planner</Text>
        <Text style={styles.headerSubtitle}>
          Generate weekly Nigerian meal plans and shopping lists
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
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

        {loading && (
          <View style={styles.loadingSection}>
            <Text style={styles.loadingText}>Creating your weekly Nigerian menu...</Text>
          </View>
        )}

        {mealPlan && (
          <View style={styles.mealPlanSection}>
            <Text style={styles.mealPlanTitle}>📅 Your Weekly Meal Plan</Text>
            <Text style={styles.comingSoon}>Coming soon with detailed meal planning!</Text>
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
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  mealPlanSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  mealPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  comingSoon: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});