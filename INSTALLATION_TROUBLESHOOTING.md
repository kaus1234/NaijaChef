# 🔧 Installation Troubleshooting Guide

## ⚠️ Common Issue: Dependency Conflicts

If you're experiencing this error:

```
npm error ERESOLVE could not resolve
npm error While resolving: expo-router@6.0.14
npm error Found: expo-linking@7.1.7
npm error Could not resolve dependency:
npm error peer expo-linking@"^8.0.8" from expo-router@6.0.14
```

This is a **version compatibility issue** between expo-router and expo-linking packages.

## 🛠️ Solutions

### Solution 1: Use Legacy Peer Dependencies (Recommended)

```bash
npm install --legacy-peer-deps
```

### Solution 2: Clean Install

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps
```

### Solution 3: Update Package Versions

If you have expo-router@6.0.14, update your package.json to compatible versions:

```json
{
  "dependencies": {
    "expo": "~54.0.0",
    "expo-router": "~6.0.14",
    "expo-linking": "~8.0.8",
    "expo-constants": "~18.0.10",
    "@expo/vector-icons": "^15.0.3",
    "react-native-svg": "~15.12.1",
    "@react-native-async-storage/async-storage": "~2.2.0"
  }
}
```

## 📱 Complete Installation Steps

### Step 1: Clone and Navigate
```bash
git clone https://github.com/kaus1234/NaijaChef.git
cd NaijaChef
```

### Step 2: Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Edit .env file with your OpenAI API key
notepad .env  # on Windows
# or
nano .env     # on Mac/Linux
```

Add your OpenAI API key:
```env
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

### Step 3: Install Dependencies
```bash
# Use legacy peer deps to avoid conflicts
npm install --legacy-peer-deps
```

### Step 4: Verify Installation
```bash
# Check TypeScript compilation
npm run typecheck

# Should return with no errors
```

### Step 5: Start the App
```bash
npm start
```

## 🔍 Common Issues and Solutions

### Issue 1: "setImmediate is not defined"
**Solution:** This is usually a React Native Metro bundler issue. Try:
```bash
npx expo start --clear
```

### Issue 2: Metro bundler hangs
**Solution:** Clear Metro cache:
```bash
npx expo start --clear
# or
expo r -c
```

### Issue 3: Asset loading errors
**Solution:** Ensure all asset files exist:
```bash
ls assets/
# Should show: icon.png, splash.png, adaptive-icon.png, favicon.png
```

### Issue 4: TypeScript errors
**Solution:** Run typecheck:
```bash
npm run typecheck
# Fix any reported TypeScript errors
```

### Issue 5: Expo CLI version conflicts
**Solution:** Update Expo CLI:
```bash
npm install -g @expo/cli@latest
```

## 📦 Package Compatibility Matrix

| Package | Recommended Version | Status |
|---------|-------------------|--------|
| expo | ~54.0.0 | ✅ Stable |
| expo-router | ~3.5.23 | ✅ Compatible |
| expo-linking | ~7.1.2 | ✅ Compatible |
| react-native | 0.81.0 | ✅ Stable |
| @expo/vector-icons | ^14.0.0 | ✅ Compatible |
| typescript | ^5.3.3 | ✅ Stable |

## 🚀 Verification Checklist

After installation, verify:

- [ ] `npm run typecheck` passes without errors
- [ ] `npm start` launches Metro bundler
- [ ] No dependency conflicts in console
- [ ] OpenAI API key is configured in .env
- [ ] App loads on device/simulator

## 🆘 Still Having Issues?

### Check Node Version
```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
```

### Update Everything
```bash
npm install -g npm@latest
npm install -g @expo/cli@latest
```

### Full Reset
```bash
# Complete clean slate
rm -rf node_modules package-lock.json .expo
npm cache clean --force
npm install --legacy-peer-deps
```

## 📞 Support

If you're still having issues:

1. **Check the GitHub Issues**: https://github.com/kaus1234/NaijaChef/issues
2. **Verify your OpenAI API key** has credits
3. **Ensure Node.js 18+** is installed
4. **Try a different terminal** (PowerShell, Git Bash, etc.)

---

## 🎉 Quick Start (Once Installed)

```bash
# 1. Add your OpenAI API key to .env
# 2. Start the app
npm start

# 3. Scan QR code with Expo Go app
# 4. Enjoy Nigerian recipe generation! 🇳🇬
```

The app should now work perfectly with all dependencies resolved! 🚀