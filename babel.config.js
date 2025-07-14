// // module.exports = {
// //   presets: ['module:metro-react-native-babel-preset'],
// //   plugins: ['react-native-reanimated/plugin'], // ✅ This must be LAST
// // };
// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'], // or 'module:metro-react-native-babel-preset'
//     plugins: ['react-native-reanimated/plugin'],
//   };
// };

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'], // or whatever you're using
//     plugins: [
//       '@babel/plugin-transform-template-literals',
//     ],
//   };
// };

// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'react-native-reanimated/plugin',
//     ],
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // or 'module:metro-react-native-babel-preset'
    plugins: [
      '@babel/plugin-transform-template-literals',
      'react-native-reanimated/plugin', // ✅ this must be the LAST plugin
    ],
  };
};


