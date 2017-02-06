import Stats from 'stats.js'
import {combineReducers, createStore} from 'redux'
import Controls from 'input/Controls'
import {addKeyListener} from 'input/Keyboard'
import {KEY, RENDERER, SCREEN} from 'constants'
import {setHighScores, setRenderer, setUsername, showGame, showHighScores, showMainMenu} from 'state/actions/application'
import {setEvents, setLevel, setScore, setShipCount} from 'state/actions/game'
import {resize, setParticles, setPolygons} from 'state/actions/stage'
import application from 'state/reducers/application'
import game from 'state/reducers/game'
import stage from 'state/reducers/stage'

const EngineWorker = require('worker-loader?inline!shared/js/engine-worker.js')

const startGame = () => engine.postMessage({action:'startGame'})

const saveScore = username =>
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
  store.dispatch(showHighScores())
}

const requestEngineUpdate = () =>
{
  if (DEVELOPMENT)
    stats.begin()

  const {accelerating, rotatingLeft, rotatingRight, shooting, hyperspace} = controls
  const {width, height} = store.getState().stage

  engine.postMessage({action: 'update', controls: {accelerating, hyperspace, rotatingLeft, rotatingRight, shooting}, stageWidth: width, stageHeight: height})
}

const handleEngineMessage = ({data}) =>
{
  const {application, game, stage} = store.getState()
  const {screen} = application
  const {events, level, score, shipCount} = game

  data.forEach((value, key) =>
  {
    switch (key)
    {
      case 'events':
        store.dispatch(setEvents(value))
        break

      case 'level':
        if (level !== value)
          store.dispatch(setLevel(value))
        break

      case 'particles':
        store.dispatch(setParticles(value))
        break

      case 'polygons':
        store.dispatch(setPolygons(value))
        break

      case 'score':
        if (score !== value)
          store.dispatch(setScore(value))
        break

      case 'shipCount':
        if (shipCount !== value)
          store.dispatch(setShipCount(value))
        break
    }
  })

  if (!data.has('events')
  && events.length > 0)
    store.dispatch(setEvents([]))

  if (!data.has('particles')
  && stage.particles.length > 0)
    store.dispatch(setParticles([]))

  if (!data.has('polygons')
  && stage.polygons.length > 0)
    store.dispatch(setPolygons([]))

  if (data.has('shipCount')
  && application.screen !== SCREEN.GAME)
    store.dispatch(showGame())

  else if (!data.has('shipCount')
  && application.screen === SCREEN.GAME)
    store.dispatch(setShipCount(0))

  if (DEVELOPMENT)
    stats.end()

  requestAnimationFrame(requestEngineUpdate)
}

const controls = new Controls()
const engine = new EngineWorker()
const store = createStore(combineReducers({application, game, stage}))
let stats

engine.onmessage = handleEngineMessage

addKeyListener(KEY['1'], pressed => pressed && store.dispatch(setRenderer(RENDERER.SVG)))
addKeyListener(KEY['2'], pressed => pressed && store.dispatch(setRenderer(RENDERER.CANVAS)))
addKeyListener(KEY['3'], pressed => pressed && store.dispatch(setRenderer(RENDERER.PIXI_CANVAS)))
addKeyListener(KEY['4'], pressed => pressed && store.dispatch(setRenderer(RENDERER.PIXI_WEBGL)))
addKeyListener(KEY['5'], pressed => pressed && store.dispatch(setRenderer(RENDERER.THREE)))
window.addEventListener('resize', () => store.dispatch(resize()))

if (DEVELOPMENT)
{
  stats = new Stats()
  Object.assign(stats.dom.style, {top:'unset', bottom: 0})
  document.body.appendChild(stats.dom)
}

requestEngineUpdate()

export {store, saveScore, startGame}
