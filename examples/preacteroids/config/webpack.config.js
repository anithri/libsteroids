const path = require('path')
const rimraf = require('rimraf')
const config = require('libsteroids-examples-shared/config/webpack.config')
const environment = process.env.NODE_ENV
const rootDirectory = path.resolve(__dirname, '..')
const sourceDirectory = `${rootDirectory}/source`

config.context = sourceDirectory
config.module.rules.forEach(rule => rule.include.push(sourceDirectory))
config.module.rules[1].use.query.presets.push('react')
Object.assign(config.resolve, {
  alias: {
    components: `${sourceDirectory}/components`,
    constants: 'libsteroids-examples-shared/js/constants',
    css: 'libsteroids-examples-shared/css',
    'libsteroids-redux': 'libsteroids-examples-shared/js/redux'
  },
  modules: [sourceDirectory, `${rootDirectory}/node_modules`]
})

if (process.argv[1].split('/').pop() === 'webpack')
{
  const buildDirectory = `${rootDirectory}/build`

  config.output.path = buildDirectory
  rimraf.sync(buildDirectory)
}

module.exports = config
