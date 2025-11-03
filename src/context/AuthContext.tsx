import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/src/services/auth';
import authService from '@/src/services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        const isValidToken = await authService.isTokenValid();

        if (currentUser && isValidToken) {
          setUser(currentUser);
        } else {
          // Token is invalid, clear stored data
          await authService.signOut();
        }
      } catch (error) {
        console.error('Auth status check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signUp = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await authService.signUp(email, password, name);
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await authService.signIn(email, password);
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await authService.signOut();
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await authService.forgotPassword(email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      setLoading(true);
      await authService.resetPassword(token, newPassword);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      const updatedUser = await authService.updateProfile(updates);
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}