const AotPlugin = require('@ngtools/webpack').AotPlugin
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin
const path = require('path')
const rimraf = require('rimraf')
const config = require('libsteroids-examples-shared/config/webpack.config')
const environment = process.env.NODE_ENV
const rootDirectory = path.resolve(__dirname, '..')
const sourceDirectory = `${rootDirectory}/source`

config.context = sourceDirectory
config.entry = 'main.ts'
config.module.rules.forEach(rule => rule.include.push(sourceDirectory))
config.module.rules.push({test: /\.ts$/, use: environment === 'production' ? '@ngtools/webpack' : ['awesome-typescript-loader', 'angular2-template-loader']})
config.plugins.unshift(
  new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    './src'
  )
)
config.resolve.extensions.unshift('.ts')
Object.assign(config.resolve, {
  alias: {css: 'libsteroids-examples-shared/css'},
  modules: [sourceDirectory, `${rootDirectory}/node_modules`]
})

if (process.argv[1].split('/').pop() === 'webpack')
{
  const buildDirectory = `${rootDirectory}/build`

  config.output.path = buildDirectory
  rimraf.sync(buildDirectory)
}

if (environment === 'development')
{
  config.devtool = 'eval-cheap-module-source-map'

  if (config.devServer)
    Object.assign(config.devServer, {hot: true, inline: true})
}

else if (config.devServer)
  Object.assign(config.devServer, {compress: true})

if (environment === 'production')
  config.plugins.push(new AotPlugin({
    tsConfigPath: `${rootDirectory}/tsconfig.json`,
    entryModule: `${sourceDirectory}/AppModule#AppModule`
  }))

module.exports = config
