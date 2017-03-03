const cssnext = require('postcss-cssnext')
const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const {DefinePlugin, LoaderOptionsPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin, optimize} = webpack
const {UglifyJsPlugin} = optimize
const environment = process.env.NODE_ENV
const assetsDirectory = path.resolve(__dirname, '../../libsteroids-assets')
const engineDirectory = path.resolve(__dirname, '../../libsteroids-engine')
const sharedDirectory = path.resolve(__dirname, '..')
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
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: [
              ['es2015', {'modules': false}],
              'stage-2'
            ]
          }
        }
      }
    ]
  },
  output: {
    filename: 'main.js'
  },
  plugins: [
    new CopyPlugin([
      {from: `${sharedDirectory}/html/index.html`},
      {from: `${assetsDirectory}/icon/favicon.ico`},
      {from: `${assetsDirectory}/font/PressStart2P.woff2`},
      {from: `${assetsDirectory}/sounds/beatTone1.wav`},
      {from: `${assetsDirectory}/sounds/beatTone2.wav`},
      {from: `${assetsDirectory}/sounds/explosionLarge.wav`},
      {from: `${assetsDirectory}/sounds/explosionMedium.wav`},
      {from: `${assetsDirectory}/sounds/explosionSmall.wav`},
      {from: `${assetsDirectory}/sounds/saucerLarge.wav`},
      {from: `${assetsDirectory}/sounds/saucerSmall.wav`},
      {from: `${assetsDirectory}/sounds/shot.wav`},
      {from: `${assetsDirectory}/sounds/spawn.wav`},
      {from: `${assetsDirectory}/sounds/thrust.wav`}
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
    extensions: ['.js', '.css']
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
    config.devServer.compress = true
}

else
{
  config.devtool = 'cheap-module-eval-source-map'
  config.plugins.push(new NamedModulesPlugin())

  if (config.devServer)
    config.devServer.inline = true
}

module.exports = config
