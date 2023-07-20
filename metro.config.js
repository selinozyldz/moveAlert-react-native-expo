const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    ...defaultConfig.resolver,
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
      '@react-navigation/native': path.resolve(__dirname, 'node_modules/@react-navigation/native'),
    },
  },
};
