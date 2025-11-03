const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('metro-config').MetroConfig} */
const config = (() => {
  const {
    resolver: {
      assetExts: [
        ".bmp",
        ".gif",
        ".jpg",
        ".jpeg",
        ".png",
        ".svg",
        ".webp",
        ".otf",
        ".ttf",
        ".woff",
        ".woff2",
        ".eot",
        ".otf",
        ".ttc",
        ".txt",
        ".md",
        ".mdx",
        ".json",
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
      ],
      assetPlugins: [
        "react-native-reanimated/plugin",
      ],
    },
  } = getDefaultConfig(__dirname);

  return config;
})();

module.exports = config;