import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 'large',
  message,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
      <ActivityIndicator size={size} color="#FF6B35" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );

  if (fullScreen) {
    return (
      <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.fullScreenGradient}>
        {content}
      </LinearGradient>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  fullScreenGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenContainer: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});