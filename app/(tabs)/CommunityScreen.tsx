import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.header}>
        <Text style={styles.headerTitle}>👥 Community</Text>
        <Text style={styles.headerSubtitle}>
          Discover and share authentic Nigerian recipes
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.shareSection}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.shareButtonText}>Share Your Recipe</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>🔥 Featured Recipes</Text>
          <View style={styles.recipeCard}>
            <View style={styles.recipeImage}>
              <Text style={styles.placeholderIcon}>🍳</Text>
            </View>
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>Auntie Iya's Special Jollof</Text>
              <Text style={styles.recipeDescription}>
                The perfect jollof rice recipe passed down through generations
              </Text>
              <View style={styles.recipeMeta}>
                <Text style={styles.author}>Funke Akindele</Text>
                <Text style={styles.likes}>234 likes</Text>
              </View>
            </View>
          </View>

          <View style={styles.recipeCard}>
            <View style={styles.recipeImage}>
              <Text style={styles.placeholderIcon}>🥘</Text>
            </View>
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>Street-Style Suya</Text>
              <Text style={styles.recipeDescription}>
                Authentic Nigerian suya with the perfect spice blend
              </Text>
              <View style={styles.recipeMeta}>
                <Text style={styles.author}>Ahmed Bello</Text>
                <Text style={styles.likes}>189 likes</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.comingSoonSection}>
          <Text style={styles.comingSoonText}>
            🚧 Full community features coming soon!
          </Text>
          <Text style={styles.comingSoonSubtext}>
            Recipe sharing, likes, comments, and user profiles
          </Text>
        </View>
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
  shareSection: {
    paddingVertical: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
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
  featuredSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  recipeImage: {
    height: 120,
    backgroundColor: '#FFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
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
  recipeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  likes: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  comingSoonSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});