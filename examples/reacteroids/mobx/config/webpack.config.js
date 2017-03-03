const path = require('path')
const rimraf = require('rimraf')
const config = require('libsteroids-examples-shared/config/webpack.config')
const rootDirectory = path.resolve(__dirname, '..')
const sharedDirectory = `${rootDirectory}/node_modules/reacteroids-shared`
const sourceDirectory = `${rootDirectory}/source`

config.context = sourceDirectory
config.module.rules.forEach(rule => rule.include = rule.include.concat([sharedDirectory, sourceDirectory]))
config.module.rules[1].use.query.plugins = ['transform-decorators-legacy']
config.module.rules[1].use.query.presets.push('react')
Object.assign(config.resolve, {
  alias: {
    components: `${sourceDirectory}/components`,
    constants: 'libsteroids-examples-shared/js/constants',
    css: 'libsteroids-examples-shared/css',
    input: 'libsteroids-examples-shared/js/input',
    state: `${sourceDirectory}/state`
  },
  modules: [sharedDirectory, sourceDirectory, `${rootDirectory}/node_modules`]
})

if (process.argv[1].split('/').pop() === 'webpack')
{
  const buildDirectory = `${rootDirectory}/build`

  config.output.path = buildDirectory
  rimraf.sync(buildDirectory)
}

module.exports = config
