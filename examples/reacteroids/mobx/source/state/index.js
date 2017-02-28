import MobX from 'mobx'
import Stats from 'stats.js'
import {GameControlKey, RendererSelectKey, Renderer, Screen} from 'constants'
import {addKeyListener, removeKeyListener, keysDown} from 'input/keyboard'
import {Event} from 'libsteroids-engine'
import Application from 'state/stores/Application'
import Controls from 'state/stores/Controls'
import Game from 'state/stores/Game'
import Stage from 'state/stores/Stage'

const EngineWorker = require('worker-loader?inline!libsteroids-examples-shared/js/EngineWorker.js')

const GAME_OVER_PAUSE = 2000

function startGame()
{
  Object.values(GameControlKey).forEach(keyCode => addKeyListener(keyCode, handleKeyEvent))
  application.setScreen(Screen.Game)
  engine.postMessage(JSON.stringify({action:'startGame'}))
}

function endGame()
{
  application.setScreen(Screen.GameOver)

  Object.values(GameControlKey).forEach(keyCode => removeKeyListener(keyCode))

  if (controls.accelerating)
    controls.setAccelerating(false)

  if (controls.rotatingLeft)
    controls.setRotatingLeft(false)

  if (controls.rotatingRight)
    controls.setRotatingRight(false)

  if (controls.shooting)
    controls.setShooting(false)

  setTimeout(() =>
  {
    const {score} = game
    let {highScores} = application

    if (score === 0
    || (highScores.length === 10
    && score < highScores[9].score))
      return application.setScreen(Screen.HighScores)

    application.setScreen(Screen.SaveScore)
  },
  GAME_OVER_PAUSE)
}

function saveScore(username)
{
  const {score} = game
  let {highScores} = application

  username = username.toUpperCase()

  highScores.push({username, score})
  highScores.sort((a, b) => b.score - a.score)

  if (highScores.length > 10)
    highScores = highScores.slice(0, 10)

  application.setHighScores(highScores)
  application.setUsername(username)
  application.setScreen(Screen.HighScores)
}

function requestEngineUpdate()
{
  if (DEVELOPMENT)
    stats.begin()

  engine.postMessage(JSON.stringify({action: 'update', controls, stageWidth: stage.width, stageHeight: stage.height}))
}

function handleEngineMessage(message)
{
  const data = JSON.parse(message.data)

  Object.keys(data).forEach(key =>
  {
    switch (key)
    {
      case 'events':
        game.setEvents(data.events)
        break

      case 'level':
        game.setLevel(data.level)
        break

      case 'particles':
        stage.setParticles(data.particles)
        break

      case 'polygons':
        stage.setPolygons(data.polygons)
        break

      case 'score':
        game.setScore(data.score)
        break
    }
  })

  if (data.events
  && data.events.includes(gameEndEventType))
    endGame()

  if (!data.events
  && game.events.length > 0)
    game.setEvents([])

  if (!data.particles
  && stage.particles.length > 0)
    stage.setParticles([])

  if (!data.polygons
  && stage.polygons.length > 0)
    stage.setPolygons([])

  if (DEVELOPMENT)
    stats.end()

  requestAnimationFrame(requestEngineUpdate)
}

function handleKeyEvent(keyCode, keyDown)
{
  if (Object.values(GameControlKey).includes(keyCode))
  {
    switch (keyCode)
    {
      case GameControlKey.ArrowUp:
      case GameControlKey.w:
        return controls.setAccelerating(keysDown.has(GameControlKey.ArrowUp) || keysDown.has(GameControlKey.w))

      case GameControlKey.ArrowLeft:
      case GameControlKey.a:
        return controls.setRotatingLeft(keysDown.has(GameControlKey.ArrowLeft) || keysDown.has(GameControlKey.a))

      case GameControlKey.ArrowRight:
      case GameControlKey.d:
        return controls.setRotatingRight(keysDown.has(GameControlKey.ArrowRight) || keysDown.has(GameControlKey.d))

      case GameControlKey.Shift:
        if (keyDown)
        {
          controls.setHyperspace(true)
          controls.setHyperspace(false)
        }
        return

      case GameControlKey.Space:
        return controls.setShooting(keyDown)
    }
  }

  else if (keyDown)
    switch(keyCode)
    {
      case RendererSelectKey['1']:
        return application.setRenderer(Renderer.SVG)

      case RendererSelectKey['2']:
        return application.setRenderer(Renderer.Canvas)

      case RendererSelectKey['3']:
        return application.setRenderer(Renderer.PixiCanvas)

      case RendererSelectKey['4']:
        return application.setRenderer(Renderer.PixiWebGL)

      case RendererSelectKey['5']:
        return application.setRenderer(Renderer.Three)
    }
}

MobX.useStrict(true)

const application = new Application()
const controls = new Controls()
const game = new Game()
const stage = new Stage()
const engine = new EngineWorker()
const gameEndEventType = Event.GameEnd.type
let stats

Object.values(RendererSelectKey).forEach(keyCode => addKeyListener(keyCode, handleKeyEvent))
engine.onmessage = handleEngineMessage
window.addEventListener('resize', () => stage.resize())

if (DEVELOPMENT)
{
  stats = new Stats()
  Object.assign(stats.dom.style, {top:'unset', bottom: 0})
  document.body.appendChild(stats.dom)
}

requestEngineUpdate()

export {application, controls, game, stage, startGame, saveScore}
