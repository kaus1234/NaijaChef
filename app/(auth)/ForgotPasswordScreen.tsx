import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      await forgotPassword(email.trim());
      setEmailSent(true);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleBackToSignIn = () => {
    router.push('/(auth)/SignInScreen');
  };

  if (emailSent) {
    return (
      <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.successContainer}>
              <View style={styles.successIconContainer}>
                <Text style={styles.successIcon}>✉️</Text>
              </View>
              <Text style={styles.successTitle}>Reset Email Sent! 📧</Text>
              <Text style={styles.successMessage}>
                We've sent password reset instructions to:
              </Text>
              <Text style={styles.successEmail}>{email}</Text>
              <Text style={styles.instructionText}>
                Check your email and follow the instructions to reset your password.
              </Text>

              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToSignIn}
              >
                <Text style={styles.backButtonText}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FF6B35', '#FFB84D']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Reset Password 🔐</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.resetButton,
                loading && styles.disabledButton,
                !email.trim() && styles.disabledButton
              ]}
              onPress={handleResetPassword}
              disabled={loading || !email.trim()}
            >
              <Text style={styles.resetButtonText}>
                {loading ? 'Sending...' : 'Send Reset Email'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Back to Sign In */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Remember your password? </Text>
            <TouchableOpacity onPress={handleBackToSignIn}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Help Note */}
          <View style={styles.helpNote}>
            <Text style={styles.helpNoteText}>
              💡 If you don't receive an email within a few minutes, check your spam folder.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  resetButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  resetButtonText: {
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  signInLink: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  helpNote: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  helpNoteText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 10,
  },
  successEmail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
});