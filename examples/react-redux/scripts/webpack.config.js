import BabiliPlugin from 'babili-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import HtmlTemplate from 'html-webpack-template'
import cssnext from 'postcss-cssnext'
import path from 'path'
import webpack, {DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin} from 'webpack'

export default environment =>
{
  const commonDirectory = path.resolve(__dirname, '../node_modules/libsteroids-common')
  const assetsDirectory = `${commonDirectory}/assets`
  const engineDirectory = `${commonDirectory}/engine`
  const sourceDirectory = path.resolve(__dirname, '../source')
  const targetBrowsers = [
    'last 1 Chrome version',
    'last 1 Edge version',
    'last 1 Firefox version',
    'last 1 Safari version'
  ]
  const config = {
    target: 'web',
    entry: `${sourceDirectory}/main`,
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, '../build'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.css', '.ico', '.wav', '.woff2'],
      alias: {
        assets: assetsDirectory,
        engine: engineDirectory,
        input: `${sourceDirectory}/input`,
        state: `${sourceDirectory}/state`,
        ui: `${sourceDirectory}/ui`
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory=true',
          include: [engineDirectory, sourceDirectory],
          query: {
            presets: [
              ['env', {targets: {browsers: targetBrowsers}}],
              'react',
              'stage-2'
            ]
          }
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
        },
        {
          test: /(\.ico|\.wav|\.woff2)$/,
          loader: `file-loader?name=[path][name].[ext]&context=${assetsDirectory}`
        }
      ]
    },
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new DefinePlugin({
        DEVELOPMENT: JSON.stringify(environment === 'development'),
        PRODUCTION: JSON.stringify(environment === 'production'),
        NODE_ENV: JSON.stringify(environment),
        'process.env.NODE_ENV': JSON.stringify(environment)
      }),
      new ExtractTextPlugin('main.css'),
      new LoaderOptionsPlugin({
        test: /\.css$/,
        options: {postcss: () => [cssnext({browsers:targetBrowsers})]}
      })
    ],
    performance: {
      hints: environment === 'production' ? 'warning' : false
    }
  }
  const htmlConfig = {
    template: HtmlTemplate,
    inject: false,
    mobile: true,
    favicon: `${assetsDirectory}/favicon.ico`,
    title: 'Reacteroids Redux',
    minify: {
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true
    }
  }

  if (environment === 'development')
  {
    config.devtool = 'cheap-module-eval-source-map'
    config.plugins.push(new HtmlPlugin({...htmlConfig, scripts: ['/socket.io/socket.io.js']}))
  }

  else
    config.plugins.push(
      new HtmlPlugin(htmlConfig),
      new BabiliPlugin({comments: false})
    )

  return config
}
