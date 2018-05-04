const path = require('path')
const webpack = require('webpack')
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')

module.exports = (storybookBaseConfig, configType) => {
  let { loader, query, test, ...rule } = storybookBaseConfig.module.rules[0]
  // ts load everythin
  storybookBaseConfig.module.rules[0] = {
    ...rule,
    test: /\.(tsx?|jsx?)$/,
    use: [
      //{ loader, options: query },
      require.resolve('babel-loader'),
      require.resolve('ts-loader')
    ]
  }

  storybookBaseConfig.resolve.alias = Object.assign(
    storybookBaseConfig.resolve.alias || {}, {
      'react-native': 'react-native-web',
    }
  )

  const DEV = configType === 'DEVELOPMENT';

  storybookBaseConfig.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' }
    }
  });

  //storybookBaseConfig.plugins.push(new TSDocgenPlugin())
  storybookBaseConfig.resolve.extensions.push(".ts", ".tsx")


  storybookBaseConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  )

  return storybookBaseConfig;
}
