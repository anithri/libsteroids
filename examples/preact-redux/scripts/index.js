const args = process.argv.splice(2)
const helpMessage =
`  Usage: npm run [script] -- [option]

  Scripts:
    build  Runs build
    serve  Starts Webpack-based development server

  Options:
    -d  --development  Use development settings
    -p  --production   Use production settings
`

if (args.length === 0
|| args.length > 2
|| !['build', 'serve'].includes(args[0])
|| (args.length === 2
&& !['-d', '--development', '-p', '--production'].includes(args[1])))
  console.log(helpMessage)

else
{
  let environment = process.env.NODE_ENV

  if (args[1])
  {
    if (['-d', '--development'].includes(args[1]))
      environment = 'development'

    else if (['-p', '--production'].includes(args[1]))
      environment = 'production'
  }

  require('babel-register')

  switch (args[0])
  {
    case 'build':
      return require('./build')(environment || 'production')

    case 'serve':
      return require('./serve')(environment || 'development')
  }
}
