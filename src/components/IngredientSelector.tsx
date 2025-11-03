import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { nigerianIngredients, Ingredient, IngredientCategory } from '@/src/data/ingredients';

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onToggleIngredient: (ingredientId: string) => void;
  maxSelections?: number;
}

export default function IngredientSelector({
  selectedIngredients,
  onToggleIngredient,
  maxSelections = 10,
}: IngredientSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isIngredientSelected = (ingredientId: string) => {
    return selectedIngredients.includes(ingredientId);
  };

  const canSelectMore = selectedIngredients.length < maxSelections;

  const filterIngredients = (ingredients: Ingredient[]) => {
    if (!searchQuery.trim()) return ingredients;
    return ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderIngredient = (ingredient: Ingredient, categoryId: string) => {
    const isSelected = isIngredientSelected(ingredient.id);
    const canSelect = canSelectMore || isSelected;

    return (
      <TouchableOpacity
        key={ingredient.id}
        style={[
          styles.ingredientItem,
          isSelected && styles.selectedIngredientItem,
          !canSelect && styles.disabledIngredientItem,
        ]}
        onPress={() => canSelect && onToggleIngredient(ingredient.id)}
        disabled={!canSelect}
      >
        <View style={styles.ingredientInfo}>
          <Text style={styles.ingredientIcon}>{ingredient.icon}</Text>
          <Text style={[
            styles.ingredientName,
            isSelected && styles.selectedIngredientName,
            !canSelect && styles.disabledIngredientName,
          ]}>
            {ingredient.name}
          </Text>
          {ingredient.common && (
            <View style={styles.commonBadge}>
              <Text style={styles.commonBadgeText}>Popular</Text>
            </View>
          )}
        </View>
        <View style={[
          styles.checkbox,
          isSelected && styles.checkedCheckbox,
          !canSelect && styles.disabledCheckbox,
        ]}>
          {isSelected && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategory = (category: IngredientCategory) => {
    const isExpanded = expandedCategories.includes(category.id);
    const filteredIngredients = filterIngredients(category.ingredients);
    const selectedCountInCategory = filteredIngredients.filter(ing =>
      selectedIngredients.includes(ing.id)
    ).length;

    if (searchQuery.trim() && filteredIngredients.length === 0) {
      return null;
    }

    return (
      <View key={category.id} style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryHeader}
          onPress={() => toggleCategory(category.id)}
        >
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
            {selectedCountInCategory > 0 && (
              <View style={styles.selectedCountBadge}>
                <Text style={styles.selectedCountText}>{selectedCountInCategory}</Text>
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
          <View style={styles.ingredientsList}>
            {filteredIngredients.map(ingredient => renderIngredient(ingredient, category.id))}
          </View>
        )}
      </View>
    );
  };

  const removeSelectedIngredient = (ingredientId: string) => {
    onToggleIngredient(ingredientId);
  };

  const getSelectedIngredientDetails = () => {
    return selectedIngredients.map(id => {
      for (const category of nigerianIngredients) {
        const ingredient = category.ingredients.find(ing => ing.id === id);
        if (ingredient) return ingredient;
      }
      return null;
    }).filter(Boolean) as Ingredient[];
  };

  return (
    <View style={styles.container}>
      {/* Selected Ingredients Display */}
      <View style={styles.selectedContainer}>
        <Text style={styles.sectionTitle}>
          Selected Ingredients ({selectedIngredients.length}/{maxSelections})
        </Text>

        {selectedIngredients.length === 0 ? (
          <TouchableOpacity
            style={styles.emptySelected}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FF6B35" />
            <Text style={styles.emptySelectedText}>Select ingredients to get started</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.selectedList}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.selectedItemsContainer}>
                {getSelectedIngredientDetails().map(ingredient => (
                  <View key={ingredient.id} style={styles.selectedItem}>
                    <Text style={styles.selectedItemIcon}>{ingredient.icon}</Text>
                    <Text style={styles.selectedItemText}>{ingredient.name}</Text>
                    <TouchableOpacity
                      style={styles.removeItemButton}
                      onPress={() => removeSelectedIngredient(ingredient.id)}
                    >
                      <Ionicons name="close-circle" size={16} color="#FF6B35" />
                    </TouchableOpacity>
                  </View>
                ))}
                {canSelectMore && (
                  <TouchableOpacity
                    style={[styles.selectedItem, styles.addMoreItem]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Ionicons name="add" size={16} color="#FF6B35" />
                    <Text style={styles.addMoreText}>Add More</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      {/* Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Ingredients</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search ingredients..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          {/* Selection Info */}
          {!canSelectMore && (
            <View style={styles.limitWarning}>
              <Ionicons name="information-circle" size={16} color="#FF6B35" />
              <Text style={styles.limitWarningText}>
                Maximum {maxSelections} ingredients selected
              </Text>
            </View>
          )}

          {/* Categories and Ingredients */}
          <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
            {nigerianIngredients.map(renderCategory)}
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.doneButton, selectedIngredients.length === 0 && styles.disabledDoneButton]}
              onPress={() => setModalVisible(false)}
              disabled={selectedIngredients.length === 0}
            >
              <Text style={styles.doneButtonText}>
                Done ({selectedIngredients.length} selected)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  selectedContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptySelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  emptySelectedText: {
    marginLeft: 8,
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedList: {
    maxHeight: 60,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  selectedItemIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  selectedItemText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  removeItemButton: {
    marginLeft: 4,
  },
  addMoreItem: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
  },
  addMoreText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  limitWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF3F0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  limitWarningText: {
    marginLeft: 8,
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedCountBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  selectedCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ingredientsList: {
    marginTop: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedIngredientItem: {
    backgroundColor: '#FFF3F0',
    borderColor: '#FF6B35',
  },
  disabledIngredientItem: {
    opacity: 0.5,
  },
  ingredientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ingredientIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  ingredientName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedIngredientName: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  disabledIngredientName: {
    color: '#999',
  },
  commonBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  commonBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  disabledCheckbox: {
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  doneButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledDoneButton: {
    backgroundColor: '#ccc',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});