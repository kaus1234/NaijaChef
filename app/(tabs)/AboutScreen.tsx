import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthContext';
import { openaiService } from '@/src/services/openai';
import Constants from 'expo-constants';

export default function AboutScreen() {
  const { user, signOut } = useAuth();
  const [apiKeyStatus, setApiKeyStatus] = useState<'unknown' | 'valid' | 'invalid'>('unknown');
  const [testingConnection, setTestingConnection] = useState(false);

  useEffect(() => {
    checkApiKeyStatus();
  }, []);

  const checkApiKeyStatus = async () => {
    try {
      const isValid = await openaiService.validateApiKey();
      setApiKeyStatus(isValid ? 'valid' : 'invalid');
    } catch (error) {
      setApiKeyStatus('invalid');
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      const isValid = await openaiService.validateApiKey();
      setApiKeyStatus(isValid ? 'valid' : 'invalid');

      if (isValid) {
        Alert.alert('Success', 'OpenAI API connection is working correctly!');
      } else {
        Alert.alert('Connection Failed', 'Please check your OpenAI API key configuration.');
      }
    } catch (error) {
      setApiKeyStatus('invalid');
      Alert.alert('Connection Failed', 'Failed to connect to OpenAI API. Please check your configuration.');
    } finally {
      setTestingConnection(false);
    }
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@sabicook.com?subject=SabiCook Support Request');
  };

  const handleRateApp = () => {
    Alert.alert('Rate App', 'Thank you for using SabiCook! App rating feature coming soon.');
  };

  const handleShareApp = () => {
    Alert.alert('Share App', 'Share feature coming soon! Tell your friends about SabiCook.');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const getApiKeyDisplay = () => {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || Constants.expoConfig?.extra?.openaiApiKey;
    if (!apiKey) return 'Not configured';

    const maskedKey = apiKey.slice(0, 8) + '...' + apiKey.slice(-4);
    return maskedKey;
  };

  const getApiKeyStatusColor = () => {
    switch (apiKeyStatus) {
      case 'valid':
        return '#4CAF50';
      case 'invalid':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getApiKeyStatusText = () => {
    switch (apiKeyStatus) {
      case 'valid':
        return 'Connected';
      case 'invalid':
        return 'Connection Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍳</Text>
        </View>
        <Text style={styles.appName}>SabiCook</Text>
        <Text style={styles.tagline}>Your Nigerian Recipe Assistant 🍛</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About SabiCook</Text>
          <Text style={styles.sectionContent}>
            SabiCook helps you discover authentic Nigerian recipes based on ingredients you have at home.
            Powered by AI, our app generates personalized meal plans and shopping lists to make your
            Nigerian cooking experience delightful and hassle-free.
          </Text>

          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>58 categorized Nigerian ingredients</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>AI-powered recipe generation</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Weekly meal planning</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Smart shopping lists</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Community recipe sharing</Text>
            </View>
          </View>
        </View>

        {/* Developer Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Configuration</Text>

          <View style={styles.apiKeyContainer}>
            <View style={styles.apiKeyInfo}>
              <Text style={styles.apiKeyLabel}>OpenAI API Key</Text>
              <Text style={styles.apiKeyValue}>{getApiKeyDisplay()}</Text>
            </View>
            <View style={styles.apiKeyStatus}>
              <View style={[
                styles.statusDot,
                { backgroundColor: getApiKeyStatusColor() }
              ]} />
              <Text style={[styles.statusText, { color: getApiKeyStatusColor() }]}>
                {getApiKeyStatusText()}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, testingConnection && styles.disabledButton]}
            onPress={handleTestConnection}
            disabled={testingConnection}
          >
            <Ionicons name="wifi-outline" size={20} color="#FF6B35" />
            <Text style={styles.actionButtonText}>
              {testingConnection ? 'Testing...' : 'Test Connection'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => Alert.alert('API Key Setup', 'To configure your OpenAI API key:\n\n1. Create a .env file in your project root\n2. Add: EXPO_PUBLIC_OPENAI_API_KEY=your_key_here\n3. Restart the app')}
          >
            <Ionicons name="information-circle" size={20} color="#666" />
            <Text style={[styles.actionButtonText, { color: '#666' }]}>Setup Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* User Account */}
        {user && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>

            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.memberSince}>
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionButton, styles.dangerButton]}
              onPress={handleSignOut}
            >
              <Ionicons name="log-out-outline" size={20} color="#F44336" />
              <Text style={[styles.actionButtonText, { color: '#F44336' }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handleContactSupport}>
            <Ionicons name="mail-outline" size={20} color="#FF6B35" />
            <Text style={styles.actionButtonText}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleRateApp}>
            <Ionicons name="star-outline" size={20} color="#FF6B35" />
            <Text style={styles.actionButtonText}>Rate App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShareApp}>
            <Ionicons name="share-outline" size={20} color="#FF6B35" />
            <Text style={styles.actionButtonText}>Share App</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Built with ❤️ in Nigeria</Text>
          <Text style={styles.footerText}>© 2024 SabiCook. All rights reserved.</Text>
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
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresList: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lastFeatureItem: {
    marginBottom: 0,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  apiKeyContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  apiKeyInfo: {
    marginBottom: 8,
  },
  apiKeyLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  apiKeyValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
  },
  apiKeyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  secondaryButton: {
    backgroundColor: '#f8f8f8',
    borderColor: '#e0e0e0',
  },
  dangerButton: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
});