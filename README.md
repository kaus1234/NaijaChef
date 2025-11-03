# 🍳 SabiCook - Nigerian Recipe Assistant

![SabiCook Logo](https://img.shields.io/badge/SabiCook-Nigerian%20Recipe%20App-FF6B35?style=for-the-badge&logo=react)
![Expo SDK](https://img.shields.io/badge/Expo%20SDK-54.0.0-000000?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript)

## 📱 About SabiCook

SabiCook is a comprehensive Nigerian recipe app that helps users discover authentic Nigerian dishes based on ingredients they have at home. Powered by AI, the app generates personalized recipes, creates weekly meal plans, and provides a platform for community recipe sharing.

### ✨ Key Features

- 🥘 **58 Categorized Nigerian Ingredients** - Comprehensive database of authentic Nigerian ingredients
- 🤖 **AI-Powered Recipe Generation** - Smart recipes based on available ingredients using OpenAI
- 📅 **Weekly Meal Planning** - AI-generated meal plans with shopping lists
- 👥 **Community Recipe Sharing** - Share and discover recipes from other users
- 🔐 **Secure Authentication** - User accounts with secure token storage
- 🎨 **Beautiful UI** - Nigerian-themed design with orange/green palette

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- Expo CLI (`npm install -g @expo/cli`)
- OpenAI API key for recipe generation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sabicook.git
   cd sabicook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - Download the Expo Go app on your phone
   - Scan the QR code shown in the terminal
   - Or run `npm run android` / `npm run ios`

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React Native 0.81 with Expo SDK 54
- **Language**: TypeScript 5.9.2
- **Navigation**: Expo Router (File-based routing)
- **State Management**: React Context (AuthContext, RecipeContext)
- **UI Components**: React Native Paper, Linear Gradients
- **API Integration**: Axios with OpenAI GPT
- **Authentication**: Custom auth with expo-secure-store
- **Storage**: AsyncStorage + SecureStore

### Project Structure

```
sabicook/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── SignInScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── (tabs)/            # Main app screens
│   │   ├── index.tsx      # Home Screen
│   │   ├── RecipeDetail.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── MealPlanScreen.tsx
│   │   └── AboutScreen.tsx
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Reusable components
│   │   ├── IngredientSelector.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorDisplay.tsx
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── RecipeContext.tsx
│   ├── services/         # API and business logic
│   │   ├── auth.ts
│   │   ├── openai.ts
│   │   └── api.ts
│   ├── data/            # Static data
│   │   └── ingredients.ts
│   └── utils/           # Utility functions
├── assets/              # Images and fonts
├── .env                 # Environment variables
├── app.json            # Expo configuration
└── package.json        # Dependencies
```

## 🥘 Nigerian Ingredients Database

The app includes 58 authentic Nigerian ingredients organized into 5 categories:

### Categories
1. **Proteins** (15 items) - Chicken, Beef, Fish, Goat Meat, Turkey, Eggs, etc.
2. **Carbohydrates** (12 items) - Rice, Garri, Yam, Plantain, Beans, etc.
3. **Vegetables** (10 items) - Tomatoes, Onions, Ugu, Spinach, Okra, etc.
4. **Oils & Fats** (6 items) - Palm Oil, Vegetable Oil, Groundnut Oil, etc.
5. **Spices & Seasonings** (15 items) - Curry Powder, Thyme, Crayfish, etc.

### Ingredient Selection Features
- 🔍 **Search functionality** - Quick ingredient search
- 📱 **Modal picker** - Beautiful ingredient selection interface
- ✅ **Visual feedback** - Checkbox selection with counts
- 🔄 **Category expansion** - Expand/collapse ingredient categories
- ⭐ **Popular ingredients** - Highlighted commonly used items

## 🤖 AI Recipe Generation

### OpenAI Integration
The app uses OpenAI's GPT to generate authentic Nigerian recipes based on selected ingredients.

#### Features
- **Recipe Generation**: 5-6 Nigerian recipes based on ingredients
- **Meal Planning**: 7-day meal plans with shopping lists
- **Authenticity Focus**: Prompts engineered for Nigerian cuisine
- **Structured Output**: Consistent recipe format with ingredients, instructions, timing
- **Error Handling**: Graceful fallbacks and user-friendly error messages

#### API Endpoints
```typescript
// Generate recipes from ingredients
generateRecipes(ingredients: string[]): Promise<Recipe[]>

// Generate weekly meal plan
generateMealPlan(): Promise<MealPlan>
```

## 📱 Screens Overview

### 1. Welcome & Authentication
- **Welcome Screen**: App introduction and onboarding
- **Sign In/Sign Up**: User registration and login
- **Forgot Password**: Password recovery flow

### 2. Home Screen
- **Ingredient Selection**: Choose from 58 Nigerian ingredients
- **Recipe Generation**: AI-powered recipe creation
- **Recipe Cards**: Beautiful display of generated recipes
- **Search & Filter**: Find recipes quickly

### 3. Recipe Details
- **Tabbed Interface**: Ingredients | Instructions | Nutrition
- **Interactive Checklists**: Track cooking progress
- **Step-by-Step Guide**: Detailed cooking instructions
- **Save Recipes**: Add to personal collection

### 4. Meal Planning
- **Weekly Plans**: 7-day AI-generated meal schedules
- **Shopping Lists**: Organized by ingredient categories
- **Interactive Lists**: Check off items as you shop
- **Regeneration**: Create new meal plans anytime

### 5. Community
- **Recipe Sharing**: User-generated content
- **Social Features**: Like, comment, save recipes
- **Filter Options**: Trending, Recent, Favorites
- **Author Profiles**: Recipe creator information

### 6. Settings & About
- **API Configuration**: OpenAI key setup
- **Account Management**: User profile and preferences
- **App Information**: Version, credits, support

## 🔐 Authentication System

### Features
- **Custom Auth**: Email/password authentication
- **Secure Storage**: Token management with expo-secure-store
- **Session Management**: Automatic token refresh
- **User Profiles**: Account information and preferences
- **Password Recovery**: Email-based password reset

### Security
- **Token Storage**: Secure storage for authentication tokens
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Secure error messages
- **Session Timeout**: Automatic logout on token expiry

## 🎨 UI/UX Design

### Design System
- **Color Palette**:
  - Primary Orange: #FF6B35
  - Secondary Green: #4CAF50
  - Accent Yellow: #FFC107
  - Background White: #FFFFFF
- **Typography**: Clean, readable fonts with clear hierarchy
- **Components**: Consistent, reusable components
- **Animations**: Smooth transitions and loading states

### Nigerian Themes
- **Cultural Elements**: Nigerian food-themed icons and imagery
- **Local Context**: Authentic Nigerian dish names and descriptions
- **Color Scheme**: Warm, food-inspired colors
- **User Experience**: Intuitive for Nigerian users

## 🛠 Development

### Environment Setup

1. **Development Server**
   ```bash
   npm start          # Start Expo development server
   npm run android     # Run on Android device/emulator
   npm run ios         # Run on iOS simulator/device
   npm run web         # Run in web browser
   ```

2. **Build Commands**
   ```bash
   npm run build:android    # Build for Android
   npm run build:ios        # Build for iOS
   npm run submit           # Submit to app stores
   ```

3. **TypeScript Checking**
   ```bash
   npx tsc --noEmit        # Type checking without compilation
   ```

### Code Quality
- **TypeScript**: Full type safety throughout the app
- **ESLint**: Code linting and formatting
- **Component Architecture**: Modular, reusable components
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized rendering and state management

## 📦 Dependencies

### Core Dependencies
- `expo@~54.0.0` - Expo SDK
- `react@19.1.0` - React library
- `react-native@0.81.0` - React Native
- `expo-router@~3.5.23` - File-based routing
- `typescript@^5.9.2` - TypeScript

### UI & Navigation
- `react-native-paper@^5.12.5` - Material Design components
- `react-native-reanimated@~4.1.0` - Animations
- `react-native-screens@~4.16.0` - Native screens
- `expo-linear-gradient@~13.0.2` - Gradient backgrounds

### Storage & APIs
- `expo-secure-store@~13.0.2` - Secure storage
- `@react-native-async-storage/async-storage@^2.2.0` - Local storage
- `axios@^1.7.7` - HTTP client for API calls

## 🔧 Configuration

### Environment Variables
```env
# Required for AI recipe generation
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### Expo Configuration
The app uses Expo SDK 54 with the following key configurations:
- File-based routing with expo-router
- Support for Android and iOS
- Web platform support
- Custom bundle identifier

## 🚀 Deployment

### Build Process
1. **EAS Build Setup**
   ```bash
   npm install -g eas-cli
   eas build:configure
   ```

2. **Android Build**
   ```bash
   eas build --platform android --profile production
   ```

3. **iOS Build**
   ```bash
   eas build --platform ios --profile production
   ```

### App Store Submission
- Google Play Store ready
- Apple App Store ready
- Automated builds with EAS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use proper error handling
- Maintain code consistency
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** - For powering the recipe generation AI
- **Expo** - For the amazing React Native development platform
- **Nigerian Food Community** - For inspiration and recipe authenticity

## 📞 Support

- **Email**: support@sabicook.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/sabicook/issues)
- **Documentation**: [Full documentation](https://sabicook-docs.vercel.app)

## 🔮 Roadmap

### Upcoming Features
- [ ] **Offline Recipe Access** - Download recipes for offline use
- [ ] **Recipe Videos** - Video integration for cooking tutorials
- [ ] **Advanced Filters** - Dietary restrictions, cooking time, difficulty
- [ ] **Social Sharing** - Share recipes on social media
- [ ] **Multi-language** - Hausa, Yoruba, Igbo language support
- [ ] **Grocery Integration** - Connect with grocery delivery services

### Future Enhancements
- [ ] **Nutrition Tracking** - Track nutritional information
- [ ] **Cooking Timer** - Built-in cooking timers
- [ ] **Recipe Ratings** - User rating and review system
- [ ] **Wine Pairing** - Suggest drink pairings
- [ ] **Voice Commands** - Voice-controlled recipe navigation

---

**Built with ❤️ in Nigeria** | © 2024 SabiCook. All rights reserved.