module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          assets      : './src/assets',
          components  : './src/components',
          values      : './src/values',
          //config      : './src/config',
          //reducers    : './src/reducers',
          //actions     : './src/actions',
          //common      : './src/common',
          //utils       : './src/utils',
          navigation  : './src/navigation',
          store       : './src/store',
          //api         : 'src/api',     
        },
      },
    ],
  ],
};
