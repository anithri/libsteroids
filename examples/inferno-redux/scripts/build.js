import clc from 'cli-color'
import path from 'path'
import shelljs from 'shelljs'
import webpack from 'webpack'
import configureWebpack from './webpack.config'

export default environment =>
{
  const rootDirectory = path.resolve(__dirname, '..')

  shelljs.rm('-rf', `${rootDirectory}/build`)

  process.stdout.write(clc.green(`Running build...`))

  try
  {
    webpack(configureWebpack(environment))
      .run((error, stats) =>
      {
        if (error)
          return console.log(clc.red(`\n${error}`))

        const jsonStats = stats.toJson()

        if (jsonStats.errors.length > 0)
          return jsonStats.errors.forEach(error => console.log(clc.red(`\n${error}`)))

        if (jsonStats.warnings.length > 0)
          return jsonStats.warnings.forEach(warning => console.log(clc.yellow(`\n${warning}`)))

        console.log(clc.green(' complete'))
      })
  }

  catch(error)
  {
    console.log(clc.red(`${error.message}`))
  }
}
