import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '@/src/components/LoadingSpinner';

// Mock data for community recipes (in a real app, this would come from an API)
const mockCommunityRecipes = [
  {
    id: '1',
    title: 'Auntie Iya\'s Special Jollof Rice',
    description: 'The perfect jollof rice recipe passed down through generations',
    author: 'Funke Akindele',
    authorAvatar: 'FA',
    postingTime: '2 hours ago',
    image: null,
    likes: 234,
    comments: 45,
    cookingTime: '45 minutes',
    difficulty: 'Medium',
    category: 'Main Dish',
  },
  {
    id: '2',
    title: 'Street-Style Suya',
    description: 'Authentic Nigerian suya with the perfect spice blend',
    author: 'Ahmed Bello',
    authorAvatar: 'AB',
    postingTime: '5 hours ago',
    image: null,
    likes: 189,
    comments: 32,
    cookingTime: '30 minutes',
    difficulty: 'Easy',
    category: 'Snacks',
  },
  {
    id: '3',
    title: 'Mama Ada\'s Banga Soup',
    description: 'Rich, flavorful banga soup perfect with fufu',
    author: 'Ada Eze',
    authorAvatar: 'AE',
    postingTime: '1 day ago',
    image: null,
    likes: 456,
    comments: 78,
    cookingTime: '2 hours',
    difficulty: 'Hard',
    category: 'Soups',
  },
];

export default function CommunityScreen() {
  const [recipes, setRecipes] = useState(mockCommunityRecipes);
  const [activeFilter, setActiveFilter] = useState<'trending' | 'recent' | 'favorites'>('trending');
  const [showShareModal, setShowShareModal] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const handleLikeRecipe = (recipeId: string) => {
    setLikedRecipes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
        // Update like count
        setRecipes(prevRecipes =>
          prevRecipes.map(recipe =>
            recipe.id === recipeId
              ? { ...recipe, likes: recipe.likes - 1 }
              : recipe
          )
        );
      } else {
        newSet.add(recipeId);
        // Update like count
        setRecipes(prevRecipes =>
          prevRecipes.map(recipe =>
            recipe.id === recipeId
              ? { ...recipe, likes: recipe.likes + 1 }
              : recipe
          )
        );
      }
      return newSet;
    });
  };

  const handleShareRecipe = () => {
    Alert.alert('Share Recipe', 'Recipe sharing feature coming soon!');
  };

  const handleCommentOnRecipe = (recipeId: string) => {
    Alert.alert('Comments', 'Comment feature coming soon!');
  };

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

  const renderCommunityRecipeCard = (recipe: any) => {
    const isLiked = likedRecipes.has(recipe.id);

    return (
      <View key={recipe.id} style={styles.recipeCard}>
        {/* Recipe Image */}
        <View style={styles.imageContainer}>
          <View style={[styles.recipeImage, styles.placeholderImage]}>
            <Text style={styles.placeholderIcon}>🍳</Text>
          </View>

          {/* Author Info */}
          <View style={styles.authorContainer}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorAvatarText}>{recipe.authorAvatar}</Text>
            </View>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{recipe.author}</Text>
              <Text style={styles.postingTime}>{recipe.postingTime}</Text>
            </View>
          </View>
        </View>

        {/* Recipe Content */}
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text style={styles.recipeDescription} numberOfLines={2}>
            {recipe.description}
          </Text>

          {/* Recipe Stats */}
          <View style={styles.recipeStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.statText}>{recipe.cookingTime}</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(recipe.difficulty) }
              ]}>
                <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.categoryText}>{recipe.category}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleLikeRecipe(recipe.id)}
            >
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={20}
                color={isLiked ? '#FF1744' : '#666'}
              />
              <Text style={[styles.actionButtonText, isLiked && styles.likedText]}>
                {recipe.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCommentOnRecipe(recipe.id)}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#666" />
              <Text style={styles.actionButtonText}>{recipe.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShareRecipe}
            >
              <Ionicons name="share-outline" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const ShareRecipeModal = () => (
    <Modal
      visible={showShareModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowShareModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowShareModal(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Share Your Recipe</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Recipe Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter your recipe name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={[styles.formInput, styles.textArea]}
              placeholder="Describe your recipe"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Ingredients</Text>
            <TextInput
              style={[styles.formInput, styles.textArea]}
              placeholder="List ingredients with measurements"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Instructions</Text>
            <TextInput
              style={[styles.formInput, styles.textArea]}
              placeholder="Step-by-step cooking instructions"
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.formLabel}>Cooking Time</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g., 30 mins"
                placeholderTextColor="#999"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.formLabel}>Difficulty</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Easy/Medium/Hard"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Share Recipe</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.header}>
        <Text style={styles.headerTitle}>👥 Community</Text>
        <Text style={styles.headerSubtitle}>
          Discover and share authentic Nigerian recipes
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Share Recipe Button */}
        <View style={styles.shareSection}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => setShowShareModal(true)}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.shareButtonText}>Share Your Recipe</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {[
            { key: 'trending', label: '🔥 Trending' },
            { key: 'recent', label: '⏰ Recent' },
            { key: 'favorites', label: '❤️ Favorites' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                activeFilter === filter.key && styles.activeFilterTab,
              ]}
              onPress={() => setActiveFilter(filter.key as any)}
            >
              <Text style={[
                styles.filterTabText,
                activeFilter === filter.key && styles.activeFilterTabText,
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recipes List */}
        <ScrollView
          style={styles.recipesList}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <LoadingSpinner message="Loading community recipes..." />
            </View>
          ) : (
            recipes.map(renderCommunityRecipeCard)
          )}
        </ScrollView>
      </View>

      {/* Share Recipe Modal */}
      <ShareRecipeModal />
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
  shareSection: {
    padding: 20,
    paddingBottom: 10,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#FFF3F0',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeFilterTabText: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  recipesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    paddingVertical: 40,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
  },
  authorContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  authorAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  authorInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  authorName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  postingTime: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
  },
  recipeContent: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18,
  },
  recipeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  likedText: {
    color: '#FF1744',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});