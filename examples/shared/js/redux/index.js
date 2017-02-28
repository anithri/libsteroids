import {combineReducers, createStore} from 'redux'
import Stats from 'stats.js'
import {Event} from 'libsteroids-engine'
import {GameControlKey, RendererSelectKey, Renderer, Screen} from '../constants'
import {addKeyListener, removeKeyListener, keysDown} from '../input/keyboard'
import {resize, setAccelerating, setEvents, setHighScores, setHyperspace, setLevel, setParticles, setRenderer, setPolygons, setRotatingLeft, setRotatingRight, setScore, setScreen, setShooting, setUsername} from './actions'
import combinedReducer from './reducers'

const EngineWorker = require('worker-loader?inline!../EngineWorker.js')

const GAME_OVER_PAUSE = 2000

function startGame()
{
  Object.values(GameControlKey).forEach(keyCode => addKeyListener(keyCode, handleKeyEvent))
  store.dispatch(setScreen(Screen.Game))
  engine.postMessage(JSON.stringify({action:'startGame'}))
}

function endGame()
{
  const {controls} = store.getState()

  store.dispatch(setScreen(Screen.GameOver))

  Object.values(GameControlKey).forEach(keyCode => removeKeyListener(keyCode))

  if (controls.accelerating)
    store.dispatch(setAccelerating(false))

  if (controls.rotatingLeft)
    store.dispatch(setRotatingLeft(false))

  if (controls.rotatingRight)
    store.dispatch(setRotatingRight(false))

  if (controls.shooting)
    store.dispatch(setShooting(false))

  setTimeout(() =>
  {
    const {application, game} = store.getState()
    const {score} = game
    let {highScores} = application

    if (score === 0
    || (highScores.length === 10
    && score < highScores[9].score))
      return store.dispatch(setScreen(Screen.HighScores))

    store.dispatch(setScreen(Screen.SaveScore))
  },
  GAME_OVER_PAUSE)
}

function saveScore(username)
{
  const {application, game} = store.getState()
  const {score} = game
  let {highScores} = application

  username = username.toUpperCase()

  highScores.push({username, score})
  highScores.sort((a, b) => b.score - a.score)

  if (highScores.length > 10)
    highScores = highScores.slice(0, 10)

  store.dispatch(setHighScores(highScores))
  store.dispatch(setUsername(username))
  store.dispatch(setScreen(Screen.HighScores))
}

function requestEngineUpdate()
{
  if (DEVELOPMENT)
    stats.begin()

  const {controls, stage} = store.getState()

  engine.postMessage(JSON.stringify({action: 'update', controls, stageWidth: stage.width, stageHeight: stage.height}))
}

function handleEngineMessage(message)
{
  const {application, game, stage} = store.getState()
  const {screen} = application
  const {events, level, score} = game
  const data = JSON.parse(message.data)

  Object.keys(data).forEach(key =>
  {
    switch (key)
    {
      case 'events':
        store.dispatch(setEvents(data.events))
        break

      case 'level':
        store.dispatch(setLevel(data.level))
        break

      case 'particles':
        store.dispatch(setParticles(data.particles))
        break

      case 'polygons':
        store.dispatch(setPolygons(data.polygons))
        break

      case 'score':
        store.dispatch(setScore(data.score))
        break
    }
  })

  if (data.events
  && data.events.includes(gameEndEventType))
    endGame()

  if (!data.events
  && events.length > 0)
    store.dispatch(setEvents([]))

  if (!data.particles
  && stage.particles.length > 0)
    store.dispatch(setParticles([]))

  if (!data.polygons
  && stage.polygons.length > 0)
    store.dispatch(setPolygons([]))

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
        return store.dispatch(setAccelerating(keysDown.has(GameControlKey.ArrowUp) || keysDown.has(GameControlKey.w)))

      case GameControlKey.ArrowLeft:
      case GameControlKey.a:
        return store.dispatch(setRotatingLeft(keysDown.has(GameControlKey.ArrowLeft) || keysDown.has(GameControlKey.a)))

      case GameControlKey.ArrowRight:
      case GameControlKey.d:
        return store.dispatch(setRotatingRight(keysDown.has(GameControlKey.ArrowRight) || keysDown.has(GameControlKey.d)))

      case GameControlKey.Shift:
        if (keyDown)
        {
          store.dispatch(setHyperspace(true))
          store.dispatch(setHyperspace(false))
        }
        return

      case GameControlKey.Space:
        return store.dispatch(setShooting(keyDown))
    }
  }

  else if (keyDown)
    switch(keyCode)
    {
      case RendererSelectKey['1']:
        return store.dispatch(setRenderer(Renderer.SVG))

      case RendererSelectKey['2']:
        return store.dispatch(setRenderer(Renderer.Canvas))

      case RendererSelectKey['3']:
        return store.dispatch(setRenderer(Renderer.PixiCanvas))

      case RendererSelectKey['4']:
        return store.dispatch(setRenderer(Renderer.PixiWebGL))

      case RendererSelectKey['5']:
        return store.dispatch(setRenderer(Renderer.Three))
    }
}

const engine = new EngineWorker()
const gameEndEventType = Event.GameEnd.type
const store = createStore(combinedReducer)
let stats

Object.values(RendererSelectKey).forEach(keyCode => addKeyListener(keyCode, handleKeyEvent))
engine.onmessage = handleEngineMessage
window.addEventListener('resize', () => store.dispatch(resize()))

if (DEVELOPMENT)
{
  stats = new Stats()
  Object.assign(stats.dom.style, {top:'unset', bottom: 0})
  document.body.appendChild(stats.dom)
}

requestEngineUpdate()

export {store, saveScore, startGame}
