# 🚀 SabiCook - Setup Instructions

## Prerequisites

Before setting up SabiCook, make sure you have the following installed:

1. **Node.js 20+** - Download from [nodejs.org](https://nodejs.org/)
2. **Expo CLI** - Install globally: `npm install -g @expo/cli`
3. **OpenAI API Key** - Get your key from [OpenAI Platform](https://platform.openai.com/api-keys)
4. **Git** - For cloning the repository

## 📋 Quick Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sabicook.git
cd sabicook
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** and add your OpenAI API key:
   ```env
   EXPO_PUBLIC_OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

### 4. Start Development

```bash
npm start
```

This will start the Expo development server and show you a QR code to scan with your phone.

## 📱 Running on Different Platforms

### 📱 Mobile Device (Recommended)

1. Download **Expo Go** app from App Store or Google Play
2. Scan the QR code shown in the terminal
3. The app will load on your device

### 💻 Web Browser

```bash
npm run web
```

### 🤖 Android Emulator

```bash
# Make sure you have Android Studio and an emulator set up
npm run android
```

### 🍎 iOS Simulator

```bash
# Make sure you have Xcode and a simulator set up
npm run ios
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device |
| `npm run web` | Run in web browser |
| `npm run build:android` | Build for Android production |
| `npm run build:ios` | Build for iOS production |
| `npx tsc --noEmit` | Check TypeScript types |

## ⚙️ Configuration Details

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required for AI recipe generation
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

**Important:** Your OpenAI API key is required for the AI recipe generation feature to work.

### OpenAI API Setup

1. **Get API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key to your `.env` file

2. **API Usage:**
   - The app uses GPT-3.5-turbo for recipe generation
   - Typical usage: 1-2 API calls per recipe generation
   - Cost: Very low (less than $0.01 per use)

## 🐛 Troubleshooting

### Common Issues

#### 1. Metro bundler not starting
```bash
# Clear Metro cache
npx expo start -c

# Or clear node modules and reinstall
rm -rf node_modules
npm install
npm start
```

#### 2. TypeScript errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# If errors persist, ensure all dependencies are installed
npm install --legacy-peer-deps
```

#### 3. OpenAI API not working
- Verify your API key is correctly set in `.env` file
- Check if you have sufficient API credits
- Ensure your key has the correct permissions

#### 4. App not loading on device
- Make sure your device and computer are on the same WiFi network
- Restart the Expo development server
- Clear cache in Expo Go app

#### 5. Build issues
```bash
# For Android build issues
npx expo install --fix

# Clear Expo cache
expo r -c

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📱 Platform-Specific Setup

### Android Setup

1. **Android Studio** - Install from [developer.android.com](https://developer.android.com/studio)
2. **Enable USB Debugging** on your Android device
3. **Create Virtual Device** if using emulator

### iOS Setup

1. **Xcode** - Install from Mac App Store
2. **Xcode Command Line Tools** - Install via Xcode preferences
3. **iOS Simulator** - Comes with Xcode

## 🔒 Security Notes

- **Never commit your `.env` file** to version control
- **Keep your OpenAI API key private**
- **Use a separate API key for development and production**
- **Monitor your OpenAI API usage and costs**

## 📊 Performance Tips

1. **Development Mode** - Use development server for fast iteration
2. **Production Build** - Use EAS build for production testing
3. **Bundle Analysis** - Use `npx expo start --dev-client` for better performance
4. **Metro Optimizations** - Adjust `metro.config.js` for large projects

## 🆘 Getting Help

If you encounter issues not covered here:

1. **Check the [README.md](./README.md)** for detailed documentation
2. **Search existing GitHub Issues**
3. **Create a new Issue** with detailed error information
4. **Join our Discord community** (link coming soon)

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Happy cooking with SabiCook! 🍳