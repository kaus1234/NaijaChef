import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRecipe } from '@/src/context/RecipeContext';
import { useAuth } from '@/src/context/AuthContext';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const { selectedIngredients, generateRecipes, loading } = useRecipe();
  const router = useRouter();

  const handleGenerateRecipes = async () => {
    try {
      await generateRecipes();
      // Navigate to recipe results
    } catch (error) {
      console.error('Error generating recipes:', error);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
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
            <TouchableOpacity style={styles.profileButton} onPress={handleSignOut}>
              <Text style={styles.profileText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🥘</Text>
              <Text style={styles.featureTitle}>58 Nigerian Ingredients</Text>
              <Text style={styles.featureDescription}>
                Choose from authentic Nigerian ingredients
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureTitle}>AI Recipe Generation</Text>
              <Text style={styles.featureDescription}>
                Get personalized recipes based on your ingredients
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📅</Text>
              <Text style={styles.featureTitle}>Meal Planning</Text>
              <Text style={styles.featureDescription}>
                Weekly meal plans with shopping lists
              </Text>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[styles.actionButton, loading && styles.disabledButton]}
              onPress={handleGenerateRecipes}
              disabled={loading || selectedIngredients.length < 2}
            >
              <Text style={styles.actionButtonText}>
                {loading ? 'Generating...' : '🍳 Start Cooking'}
              </Text>
            </TouchableOpacity>

            {selectedIngredients.length > 0 && (
              <Text style={styles.selectedInfo}>
                {selectedIngredients.length} ingredients selected
              </Text>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Built with ❤️ in Nigeria</Text>
        </View>
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
  content: {
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  actionButton: {
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
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  actionButtonText: {
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 12,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
});