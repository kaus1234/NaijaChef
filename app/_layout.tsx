import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/src/context/AuthContext';
import { RecipeProvider } from '@/src/context/RecipeContext';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <RecipeProvider>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaProvider>
        </RecipeProvider>
      </AuthProvider>
    </PaperProvider>
  );
}