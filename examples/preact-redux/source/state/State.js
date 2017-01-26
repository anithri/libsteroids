import Stats from 'stats.js'
import {combineReducers, createStore} from 'redux'
import Controls from 'input/Controls'
import {addKeyListener} from 'input/Keyboard'
import {reducer as applicationReducer, setHighScores, setRenderer, setUsername, showGame, showHighScores, RENDERER, SCREEN} from 'state/Application'
import {reducer as gameReducer, setEvents, setLevel, setScore, setShipCount} from 'state/Game'
import {reducer as stageReducer, setParticles, setPolygons} from 'state/Stage'

const KEY = {
  1: 49,
  2: 50,
  3: 51,
  4: 52
}

const EngineWorker = require('worker-loader?inline!state/EngineWorker.js')

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
        store.dispatch(setEvents(value))
        break

      case 'level':
        if (level !== value)
          store.dispatch(setLevel(value))
        break

      case 'remainingShips':

        polygons = [...polygons, ...value]

        if (value.length !== shipCount)
          store.dispatch(setShipCount(value.length))

        break

      case 'saucer':
        polygons = [...polygons, value]
        break

      case 'saucerBullets':
        particles = [...particles, ...value]
        break

      case 'score':
        if (score !== value)
          store.dispatch(setScore(value))
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
    store.dispatch(setEvents([]))

  if (particles.length > 0)
    store.dispatch(setParticles(particles))

  else if (stage.particles.length > 0)
    store.dispatch(setParticles([]))

  if (polygons.length > 0)
    store.dispatch(setPolygons(polygons))

  else if (stage.polygons.length > 0)
    store.dispatch(setPolygons([]))

  if (data.has('remainingShips')
  && application.screen !== SCREEN.GAME)
    store.dispatch(showGame())

  else if (!data.has('remainingShips')
  && application.screen === SCREEN.GAME)
    store.dispatch(setShipCount(0))

  if (DEVELOPMENT)
    stats.end()

  requestAnimationFrame(requestEngineUpdate)
}

const controls = new Controls()
const engine = new EngineWorker()
const store = createStore(combineReducers({application: applicationReducer, game: gameReducer, stage: stageReducer}))
let stats

engine.onmessage = handleEngineMessage

addKeyListener(KEY['1'], pressed => pressed && store.dispatch(setRenderer(RENDERER.SVG)))
addKeyListener(KEY['2'], pressed => pressed && store.dispatch(setRenderer(RENDERER.PIXI_CANVAS)))
addKeyListener(KEY['3'], pressed => pressed && store.dispatch(setRenderer(RENDERER.PIXI_WEBGL)))
addKeyListener(KEY['4'], pressed => pressed && store.dispatch(setRenderer(RENDERER.THREE)))
window.addEventListener('resize', () => store.dispatch(resize()))

if (DEVELOPMENT)
{
  stats = new Stats()
  Object.assign(stats.dom.style, {top:'unset', bottom: 0})
  document.body.appendChild(stats.dom)
}

requestEngineUpdate()

export {store, saveScore, startGame}
