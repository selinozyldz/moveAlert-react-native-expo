module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      alias: {
        'expo-asset': 'expo-asset/build/Asset'
      },
    }],
  ],
};