# 🔧 React Native Worklets Fix

## ⚠️ Error: "Cannot find module 'react-native-worklets/plugin'"

This is a common issue with React Native Reanimated 3.x when the worklets dependency is missing.

## 🛠️ Quick Fix Solutions

### Solution 1: Install Missing Dependencies (Recommended)

Run this command to install the missing dependencies:

```bash
npm install react-native-worklets@^0.1.0 react-native-reanimated@^3.16.1 react-native-gesture-handler@^2.20.2
```

### Solution 2: Clean Install with All Dependencies

```bash
# Remove everything
rm -rf node_modules package-lock.json
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps

# Clear Metro cache
npx expo start --clear
```

### Solution 3: Update Package.json Manually

Add these dependencies to your package.json:

```json
{
  "dependencies": {
    "react-native-reanimated": "~3.16.1",
    "react-native-worklets": "~0.1.0",
    "react-native-gesture-handler": "~2.20.2"
  }
}
```

## 📋 Complete Fixed Installation Process

### Step 1: Clone/Update Repository
```bash
git pull origin main
cd NaijaChef
```

### Step 2: Environment Setup
```bash
cp .env.example .env
# Add your OpenAI API key to .env file
```

### Step 3: Install Dependencies (Fixed)
```bash
npm install --legacy-peer-deps
```

### Step 4: Start the App
```bash
npx expo start --clear
```

## 🔍 What This Error Means

- **Cause:** `react-native-reanimated` requires `react-native-worklets` but it's not installed
- **Solution:** Install the missing worklets dependency
- **Impact:** Prevents Metro bundler from starting

## 📱 What's Included in the Fix

✅ **react-native-reanimated**: Animation library (required for smooth transitions)
✅ **react-native-worklets**: Worklets runtime for reanimated
✅ **react-native-gesture-handler**: Gesture handling for interactions
✅ **Updated babel.config.js**: Includes reanimated plugin
✅ **Updated metro.config.js**: Proper asset resolution

## 🧪 Verification

After applying the fix, verify:

1. **Installation succeeds**: `npm install --legacy-peer-deps` completes
2. **Metro starts**: `npx expo start` shows bundler running
3. **No worklets errors**: Console shows no worklets-related errors
4. **App loads**: App launches on device/simulator

## 🚀 Advanced Troubleshooting

### If the issue persists:

1. **Check babel.config.js**:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

2. **Check metro.config.js**:
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
module.exports = config;
```

3. **Clear all caches**:
```bash
expo start -c
# or
npx expo start --clear
```

## 🎯 Expected Result

After applying this fix:

- ✅ Metro bundler starts without errors
- ✅ App builds successfully on Android/iOS
- ✅ Animations and gestures work smoothly
- ✅ No worklets-related module errors

## 📞 Support

If you're still experiencing issues:

1. **Verify Node.js version**: `node --version` (should be 18+)
2. **Check Expo CLI**: `npx expo --version` (should be compatible)
3. **Try different approach**: Use Expo Go app instead of development build

---

## 🎉 Quick Start (After Fix)

```bash
# 1. Clone repository with fixes
git clone https://github.com/kaus1234/NaijaChef.git
cd NaijaChef

# 2. Install dependencies (fixed)
npm install --legacy-peer-deps

# 3. Setup environment
cp .env.example .env
# Add your OpenAI API key

# 4. Start app (no worklets errors!)
npx expo start --clear
```

The worklets issue is now completely resolved! 🚀