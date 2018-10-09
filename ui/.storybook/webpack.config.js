const path = require("path")
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin")

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules.push({
    test: /\.(js|jsx)$/,
    include: path.resolve(__dirname, "../../"),
    exclude: /node_modules/,
    loader: require.resolve("babel-loader")
  })

  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../../"),
    exclude: /node_modules/,
    loader: require.resolve("ts-loader")
  })

  defaultConfig.resolve.extensions.push('.jsx', '.ts', '.tsx')

  defaultConfig.resolve.alias = {
    'react-native': 'react-native-web'
  }

  return defaultConfig
}
