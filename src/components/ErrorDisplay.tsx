import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
  type?: 'warning' | 'error';
}

export default function ErrorDisplay({
  message,
  onRetry,
  retryText = 'Try Again',
  type = 'error',
}: ErrorDisplayProps) {
  const iconColor = type === 'error' ? '#F44336' : '#FF9800';
  const iconName = type === 'error' ? 'alert-circle' : 'warning';

  return (
    <View style={[styles.container, type === 'warning' && styles.warningContainer]}>
      <Ionicons name={iconName} size={40} color={iconColor} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Ionicons name="refresh" size={18} color="#FF6B35" />
          <Text style={styles.retryText}>{retryText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  warningContainer: {
    backgroundColor: '#FFF8E1',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 22,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});