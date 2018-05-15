const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const nodeModule = mod => resolveApp(`node_modules/${mod}`)


/* config-overrides.js */
module.exports = function override (config, env) {
  // https://www.npmjs.com/package/ts-loader#devtool--sourcemaps
  config.devtool = 'cheap-module-eval-source-map'
  config.resolve = config.resolve || {}
  config.resolve.alias = Object.assign(
    config.resolve.alias || {}, {
      'src/': path.resolve(__dirname, 'src/')
    }
  )


  // https://github.com/SZzzzz/react-scripts-ts-antd/blob/master/config/webpack.config.dev.js#L149
  // we're extracting tsLoader configuration into it's own rule to add babel preprocessing
  let [
    sourceMapRule,
    {
      oneOf: [
        urlLoader,
        jsLoader,
        { test, include, exclude, use: [ tsLoader ] },
        ...assetLoaders
      ]
    }
  ] = config.module.rules

  let babelLoader = {
    loader: 'babel-loader',
    options: { cacheDirectory: true }
  }

  let tsRule = {
    // https://github.com/SZzzzz/react-scripts-ts-antd/blob/master/config/loaders.js#L54
    // https://github.com/SZzzzz/react-scripts-ts-antd/issues/3
    test: /\.(tsx?|jsx?)$/,
    include: [
      nodeModule('react-native-really-awesome-button'),
      nodeModule('react-native-vector-icons'),
      nodeModule('react-native-animatable'),
      ...include
    ],
    exclude,
    // babel config in .babelrc
    use: [ 'babel-loader', tsLoader ]
  }

  config.module.rules = [
    sourceMapRule,
    tsRule,
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    },
    {
      // styles, images, fonts
      test: /\.(css|scss|less|gif|jpg|jpeg|tiff|png|svg|woff|woff2|ttf|eot)$/,
      oneOf: [
        urlLoader,
        ...assetLoaders
      ]
    }
  ]

  return config
}
