/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/SignInScreen` | `/(auth)/SignUpScreen` | `/(auth)/WelcomeScreen` | `/(tabs)` | `/(tabs)/` | `/(tabs)/AboutScreen` | `/(tabs)/CommunityScreen` | `/(tabs)/MealPlanScreen` | `/AboutScreen` | `/CommunityScreen` | `/MealPlanScreen` | `/SignInScreen` | `/SignUpScreen` | `/WelcomeScreen` | `/_sitemap`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
