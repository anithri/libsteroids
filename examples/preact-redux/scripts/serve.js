import Koa from 'koa'
import KoaSocket from 'koa-socket'
import clc from 'cli-color'
import compress from 'koa-compress'
import moment from 'moment'
import path from 'path'
import send from 'koa-send'
import shelljs from 'shelljs'
import webpack from 'webpack'
import configureWebpack from './webpack.config'

const time = () => moment().format('YYYY-MM-DD HH:mm:ss') + ' - '

export default environment =>
{
  const buildDirectory = path.resolve(__dirname, '../build')
  const port = 3000
  let initialBuildComplete = false
  let server, socketServer

  shelljs.rm('-rf', buildDirectory)

  process.stdout.write(time() + clc.green(`Running initial build...`))

  try
  {
    webpack(configureWebpack(environment))
      .watch({}, (error, stats) =>
      {
        if (error)
          return console.log(clc.red(`\n${error}`))

        const jsonStats = stats.toJson()
        const {errors, warnings} = jsonStats

        if (errors.length > 0)
          console.log(`\n${clc.red(errors.join('\n'))}\n`)

        else if (warnings.length > 0)
          console.log(`\n${clc.yellow(warnings.join('\n'))}\n`)

        else if (!initialBuildComplete)
          console.log(clc.green(' complete'))

        shelljs.rm('-f', `${buildDirectory}/*.worker.js`)

        if (!initialBuildComplete)
        {
          server = new Koa()
          socketServer = new KoaSocket()

          if (environment === 'production')
            server.use(compress())

          server.use(async context =>
          {
            if (context.path === '/')
              context.path = 'index.html'

            await send(context, context.path, {root: buildDirectory})
          })

          socketServer.attach(server)

          server.listen(port, () => console.log(time() + clc.green(`Server listening on port ${port}`)))

          initialBuildComplete = true
        }

        else if (errors.length === 0)
        {
          console.log(time() + clc.green('Build complete with no errors'))

          socketServer.broadcast('webpack')
        }
      })
  }

  catch(error)
  {
    console.log(clc.red(`${error.message}`))
  }
}
