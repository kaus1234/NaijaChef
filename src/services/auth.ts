import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  // In a real app, these would be API calls to your backend
  // For demo purposes, we'll simulate authentication with local storage
  private async simulateApiCall<T>(data: any, delay: number = 1000): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate some basic validation
        if (data.email && data.password) {
          resolve(data as T);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, delay);
    });
  }

  async signUp(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      // Basic validation
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      // Simulate API call
      const userData = await this.simulateApiCall<AuthResponse>({
        user: {
          id: `user_${Date.now()}`,
          email,
          name,
          createdAt: new Date().toISOString(),
        },
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });

      // Store token securely
      await this.storeToken(userData.token);

      // Store user data
      await this.storeUser(userData.user);

      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Sign up failed');
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Simulate API call
      const userData = await this.simulateApiCall<AuthResponse>({
        user: {
          id: `user_${Date.now()}`,
          email,
          name: email.split('@')[0], // Default name from email
          createdAt: new Date().toISOString(),
        },
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });

      // Store token securely
      await this.storeToken(userData.token);

      // Store user data
      await this.storeUser(userData.user);

      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Sign in failed');
    }
  }

  async signOut(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.TOKEN_KEY);
      await AsyncStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(this.TOKEN_KEY);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      // Simulate API call
      await this.simulateApiCall({ email }, 1500);

      // In a real app, this would send a reset email
      console.log(`Password reset email sent to ${email}`);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      if (!token || !newPassword) {
        throw new Error('Token and new password are required');
      }

      if (newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate API call
      await this.simulateApiCall({ token, newPassword: '***' }, 1500);
    } catch (error: any) {
      throw new Error(error.message || 'Password reset failed');
    }
  }

  async isTokenValid(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return !!token;
    } catch (error) {
      return false;
    }
  }

  private async storeToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Store token error:', error);
      throw new Error('Failed to store authentication token');
    }
  }

  private async storeUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Store user error:', error);
      throw new Error('Failed to store user data');
    }
  }

  // Method to update user profile
  async updateProfile(updates: Partial<User>): Promise<User> {
    try {
      const currentUser = await this.getCurrentUser();
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      const updatedUser = { ...currentUser, ...updates };
      await this.storeUser(updatedUser);

      return updatedUser;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  }
}

export const authService = new AuthService();
export default authService;