import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Recipe } from '@/src/services/openai';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  showSaveButton?: boolean;
}

export default function RecipeCard({
  recipe,
  onPress,
  onSave,
  isSaved = false,
  showSaveButton = true,
}: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#4CAF50';
      case 'Medium':
        return '#FF9800';
      case 'Hard':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getSpiceLevel = (category: string) => {
    // Simple logic to determine spice level based on category
    const spicyCategories = ['Soups', 'Stews', 'Spicy'];
    if (spicyCategories.some(cat => category.toLowerCase().includes(cat.toLowerCase()))) {
      return '🌶️🌶️🌶️';
    }
    return '🌶️';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.card}>
        {/* Recipe Image */}
        <View style={styles.imageContainer}>
          <View style={[styles.image, styles.placeholderImage]}>
            <Text style={styles.placeholderIcon}>🍳</Text>
          </View>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.imageGradient}
          />

          {/* Save Button */}
          {showSaveButton && onSave && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={(e) => {
                e.stopPropagation();
                onSave();
              }}
            >
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={20}
                color={isSaved ? '#FF6B35' : '#fff'}
              />
            </TouchableOpacity>
          )}

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{recipe.category}</Text>
          </View>
        </View>

        {/* Recipe Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>

          {/* Description */}
          <Text style={styles.description} numberOfLines={2}>
            {recipe.description}
          </Text>

          {/* Recipe Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{recipe.cookingTime}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{recipe.servings} servings</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="cash-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{recipe.cost}</Text>
            </View>
          </View>

          {/* Difficulty and Spice Level */}
          <View style={styles.footerContainer}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(recipe.difficulty) }]}>
              <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>

            <View style={styles.spiceLevel}>
              <Text style={styles.spiceLevelText}>{getSpiceLevel(recipe.category)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  spiceLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spiceLevelText: {
    fontSize: 14,
    marginLeft: 4,
  },
});