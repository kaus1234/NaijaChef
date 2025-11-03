import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="WelcomeScreen"
        options={{
          headerShown: false,
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        options={{
          title: 'Sign In',
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#fff',
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        options={{
          title: 'Sign Up',
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#fff',
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        options={{
          title: 'Reset Password',
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#fff',
          presentation: 'modal'
        }}
      />
    </Stack>
  );
}