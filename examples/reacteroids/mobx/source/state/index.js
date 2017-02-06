import MobX from 'mobx'
import Stats from 'stats.js'
import Controls from 'input/Controls'
import {addKeyListener} from 'input/Keyboard'
import {KEY, RENDERER, SCREEN} from 'constants'
import Application from './stores/Application'
import Game from './stores/Game'
import Stage from './stores/Stage'

MobX.useStrict(true)

const EngineWorker = require('worker-loader?inline!shared/js/engine-worker.js')

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

  data.forEach((value, key) =>
  {
    switch (key)
    {
      case 'events':
        game.setEvents(value)
        break

      case 'level':
        if (level !== value)
          game.setLevel(value)
        break

      case 'particles':
        stage.setParticles(value)
        break

      case 'polygons':
        stage.setPolygons(value)
        break

      case 'score':
        if (score !== value)
           game.setScore(value)
        break

      case 'shipCount':
        if (shipCount !== value)
           game.setShipCount(value)
        break
    }
  })

  if (!data.has('events')
  && events.length > 0)
    game.setEvents([])

  if (!data.has('particles')
  && stage.particles.length > 0)
    stage.setParticles([])

  if (!data.has('polygons')
  && stage.polygons.length > 0)
    stage.setPolygons([])

  if (data.has('shipCount')
  && application.screen !== SCREEN.GAME)
    application.setScreen(SCREEN.GAME)

  else if (!data.has('shipCount')
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

addKeyListener(KEY['1'], pressed => pressed && application.setRenderer(RENDERER.SVG))
addKeyListener(KEY['2'], pressed => pressed && application.setRenderer(RENDERER.CANVAS))
addKeyListener(KEY['3'], pressed => pressed && application.setRenderer(RENDERER.PIXI_CANVAS))
addKeyListener(KEY['4'], pressed => pressed && application.setRenderer(RENDERER.PIXI_WEBGL))
addKeyListener(KEY['5'], pressed => pressed && application.setRenderer(RENDERER.THREE))
window.addEventListener('resize', () => stage.resize())

engine.onmessage = handleEngineMessage

if (DEVELOPMENT)
{
  stats = new Stats()
  Object.assign(stats.dom.style, {top:'unset', bottom: 0})
  document.body.appendChild(stats.dom)
}

requestEngineUpdate()

export {application, game, stage, startGame, saveScore, showHighScores, showMainMenu}
