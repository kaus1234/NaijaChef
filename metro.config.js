const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for vector icons
config.resolver.assetExts.push(
  // Images
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  // Fonts
  'ttf',
  'otf',
  'woff',
  'woff2'
);

module.exports = config;