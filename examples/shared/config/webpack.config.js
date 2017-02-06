const cssnext = require('postcss-cssnext')
const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const {DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin, optimize} = webpack
const {UglifyJsPlugin} = optimize
const environment = process.env.NODE_ENV
const sharedDirectory = path.resolve(__dirname, '..')
const engineDirectory = path.resolve(__dirname, '../../libsteroids-engine')
const browsers = [
  'last 1 Chrome version',
  'last 1 Edge version',
  'last 1 Firefox version',
  'last 1 Safari version'
]
const config = {
  entry: 'main.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [sharedDirectory],
        use: ['style-loader', 'css-loader?url=false', 'postcss-loader']
      },
      {
        test: /\.js$/,
        include: [engineDirectory, sharedDirectory],
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          query: {
            presets: [
              ['es2015', {'modules': false}],
              'stage-2'
            ],
          }
        }
      }
    ]
  },
  output: {
    filename: 'libsteroids.js'
  },
  plugins: [
    new CopyPlugin([
      {from: `${sharedDirectory}/html/index.html`},
      {from: `${sharedDirectory}/icons/favicon.ico`},
      {from: `${sharedDirectory}/fonts/PressStart2P.woff2`},
      {from: `${sharedDirectory}/sounds/beatTone1.wav`},
      {from: `${sharedDirectory}/sounds/beatTone2.wav`},
      {from: `${sharedDirectory}/sounds/explosionLarge.wav`},
      {from: `${sharedDirectory}/sounds/explosionMedium.wav`},
      {from: `${sharedDirectory}/sounds/explosionSmall.wav`},
      {from: `${sharedDirectory}/sounds/saucerLarge.wav`},
      {from: `${sharedDirectory}/sounds/saucerSmall.wav`},
      {from: `${sharedDirectory}/sounds/shot.wav`},
      {from: `${sharedDirectory}/sounds/spawn.wav`},
      {from: `${sharedDirectory}/sounds/thrust.wav`}
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
    alias: {
      constants: `${sharedDirectory}/js/constants`,
      css: `${sharedDirectory}/css`,
      input: `${sharedDirectory}/js/input`,
      shared: sharedDirectory
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
