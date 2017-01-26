import MobX from 'mobx'
import Stats from 'stats.js'
import Controls from 'input/Controls'
import Application, {SCREEN} from 'state/Application'
import Game from 'state/Game'
import Stage from 'state/Stage'

MobX.useStrict(true)

const EngineWorker = require('worker-loader?inline!state/EngineWorker.js')

const startGame = () => engine.postMessage({action:'startGame'})

const showHighScores = () => application.setScreen(SCREEN.HIGH_SCORES)

const showMainMenu = () => application.setScreen(SCREEN.MAIN_MENU)

const saveScore = username =>
{
  let scores = application.highScores.concat()

  username = username.toUpperCase()

  scores.push({username, score:game.score})
  scores.sort((a, b) => b.score - a.score)

  if (scores.length > 10)
    scores = scores.slice(0, 10)

  application.setHighScores(scores)
  application.setUsername(username)

  showHighScores()
}

const requestEngineUpdate = () =>
{
  if (DEVELOPMENT)
    stats.begin()

  const {accelerating, rotatingLeft, rotatingRight, shooting, hyperspace} = controls
  const {width, height} = stage

  engine.postMessage({action: 'update', controls: {accelerating, hyperspace, rotatingLeft, rotatingRight, shooting}, stageWidth: width, stageHeight: height})
}

const handleEngineMessage = ({data}) =>
{
  const {screen} = application
  const {events, level, score, shipCount} = game
  let particles = []
  let polygons = []

  data.forEach((value, key) =>
  {
    switch (key)
    {
      case 'asteroids':
        polygons = [...polygons, ...value]
        break

      case 'explosionParticles':
        particles = [...particles, ...value]
        break

      case 'events':
        game.setEvents(value)
        break

      case 'level':
        if (level !== value)
          game.setLevel(value)
        break

      case 'remainingShips':

        polygons = [...polygons, ...value]

        if (value.length !== shipCount)
          game.setShipCount(value.length)

        break

      case 'saucer':
        polygons = [...polygons, value]
        break

      case 'saucerBullets':
        particles = [...particles, ...value]
        break

      case 'score':
        if (score !== value)
          game.setScore(value)
        break

      case 'ship':
        polygons = [...polygons, value]
        break

      case 'shipBullets':
        particles = [...particles, ...value]
        break

      case 'thrustParticles':
        particles = [...particles, ...value]
        break
    }
  })

  if (!data.has('events')
  && game.events.length > 0)
    game.setEvents([])

  if (particles.length > 0)
    stage.setParticles(particles)

  else if (stage.particles.length > 0)
    stage.setParticles([])

  if (polygons.length > 0)
    stage.setPolygons(polygons)

  else if (stage.polygons.length > 0)
    stage.setPolygons([])

  if (data.has('remainingShips')
  && application.screen !== SCREEN.GAME)
    application.setScreen(SCREEN.GAME)

  else if (!data.has('remainingShips')
  && application.screen === SCREEN.GAME)
    game.setShipCount(0)

  if (DEVELOPMENT)
    stats.end()

  requestAnimationFrame(requestEngineUpdate)
}

const application = new Application()
const controls = new Controls()
const engine = new EngineWorker()
const game = new Game()
const stage = new Stage()
let stats

engine.onmessage = handleEngineMessage

if (DEVELOPMENT)
{
  stats = new Stats()
  Object.assign(stats.dom.style, {top:'unset', bottom: 0})
  document.body.appendChild(stats.dom)
}

requestEngineUpdate()

export {application, game, stage, startGame, saveScore, showHighScores, showMainMenu}
