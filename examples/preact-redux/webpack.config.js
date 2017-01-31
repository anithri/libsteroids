const cssnext = require('postcss-cssnext')
const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const {DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin, optimize} = webpack
const {UglifyJsPlugin} = optimize
const environment = process.env.NODE_ENV
const rootDirectory = path.resolve(__dirname)
const buildDirectory = `${rootDirectory}/build`
const sourceDirectory = `${rootDirectory}/source`
const modulesDirectory = `${rootDirectory}/node_modules`
const assetsDirectory = `${modulesDirectory}/libsteroids-common/assets`
const engineDirectory = `${modulesDirectory}/libsteroids-common/engine`
const browsers = [
  'last 1 Chrome version',
  'last 1 Edge version',
  'last 1 Firefox version',
  'last 1 Safari version'
]
const config = {
  context: sourceDirectory,
  entry: 'main.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: sourceDirectory,
        use: ['style-loader', 'css-loader?url=false', 'postcss-loader']
      },
      {
        test: /\.js$/,
        include: [engineDirectory, sourceDirectory],
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          query: {
            presets: [
              ['es2015', {'modules': false}],
              'react',
              'stage-2'
            ]
          }
        }
      }
    ]
  },
  output: {
    path: buildDirectory,
    filename: 'libsteroids.js'
  },
  plugins: [
    new CopyPlugin([
      {from: 'ui/Libsteroids.html', to: 'index.html'},
      {from: `${assetsDirectory}/favicon.ico`},
      {from: `${assetsDirectory}/PressStart2P.woff2`},
      {from: `${assetsDirectory}/beatTone1.wav`},
      {from: `${assetsDirectory}/beatTone2.wav`},
      {from: `${assetsDirectory}/explosionLarge.wav`},
      {from: `${assetsDirectory}/explosionMedium.wav`},
      {from: `${assetsDirectory}/explosionSmall.wav`},
      {from: `${assetsDirectory}/saucerLarge.wav`},
      {from: `${assetsDirectory}/saucerSmall.wav`},
      {from: `${assetsDirectory}/shot.wav`},
      {from: `${assetsDirectory}/spawn.wav`},
      {from: `${assetsDirectory}/thrust.wav`}
    ]),
    new DefinePlugin({
      DEVELOPMENT: JSON.stringify(environment === 'development'),
      PRODUCTION: JSON.stringify(environment === 'production'),
      NODE_ENV: JSON.stringify(environment),
      'process.env.NODE_ENV': JSON.stringify(environment)
    }),
    new LoaderOptionsPlugin({
      test: /\.css$/,
      options: {postcss: () => [cssnext({browsers})]}
    }),
    new NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.css'],
    modules: [
      sourceDirectory,
      modulesDirectory
    ],
    alias: {
      engine: engineDirectory
    }
  },
  target: 'web'
}

if (process.argv[1].split('/').pop() === 'webpack-dev-server')
  Object.assign(config, {
    devServer: {
      clientLogLevel: 'warning',
      port: 3000,
      stats: 'minimal'
    }
  })

else
  rimraf.sync(buildDirectory)

if (environment === 'production')
{
  config.plugins.push(
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJsPlugin({
      compress: {
        cascade: true,
        collapse_vars: true,
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        loops: true,
        reduce_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false
      },
      output: {
        comments: false
      }
    })
  )

  if (config.devServer)
    Object.assign(config.devServer, {compress: true})
}

else
{
  config.devtool = 'eval-cheap-module-source-map'

  config.plugins.push(
    new	HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  )

  if (config.devServer)
    Object.assign(config.devServer, {hot: true, inline: true})
}

module.exports = config
