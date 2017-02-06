import 'css/Libsteroids.css'
import React from 'react'
import {render} from 'react-dom'
import {Provider, inject, observer} from 'mobx-react'
import {application, game, stage, startGame, saveScore, showHighScores, showMainMenu} from 'state'
import {RENDERER, SCREEN} from 'constants'
import AudioComponent from 'components/Audio'
import GameOverComponent from 'components/GameOver'
import HighScoresComponent from 'components/HighScores'
import HUDComponent from 'components/HUD'
import MainMenuComponent from 'components/MainMenu'
import RendererCanvasComponent from 'components/RendererCanvas'
import RendererPixiComponent from 'components/RendererPixi'
import RendererSVGComponent from 'components/RendererSVG'
import RendererThreeComponent from 'components/RendererThree'

const Audio = inject(({game:{events}}) => ({events}))(observer(AudioComponent))
const GameOver = inject(({application:{username}, game:{score}, saveScore}) => ({saveScore, score, username}))(observer(GameOverComponent))
const HighScores = inject(({application: {highScores}, showMainMenu}) => ({highScores, showMainMenu}))(observer(HighScoresComponent))
const HUD = inject(({application: {renderer, highScores}, game: {level, score}}) => ({level, renderer, score, topScore: highScores.length > 0 ? highScores[0].score : 0}))(observer(HUDComponent))
const MainMenu = inject(({showHighScores, startGame}) => ({showHighScores, startGame}))(observer(MainMenuComponent))
const RendererCanvas = inject(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(observer(RendererCanvasComponent))
const RendererPixi = inject(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(observer(RendererPixiComponent))
const RendererSVG = inject(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(observer(RendererSVGComponent))
const RendererThree = inject(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(observer(RendererThreeComponent))
const ReacteroidsComponent = ({renderer, screen, shipCount, saveScore, showMainMenu, startGame}) => (
  <div>
    <Audio />
    {renderer === RENDERER.SVG && <RendererSVG />}
    {renderer === RENDERER.CANVAS && <RendererCanvas />}
    {[RENDERER.PIXI_CANVAS, RENDERER.PIXI_WEBGL].includes(renderer) && <RendererPixi />}
    {renderer === RENDERER.THREE && <RendererThree />}
    {screen === SCREEN.MAIN_MENU && <MainMenu {...{startGame}} />}
    {screen === SCREEN.GAME && shipCount > 0 && <HUD />}
    {screen === SCREEN.GAME && shipCount === 0 && <GameOver {...{saveScore}} />}
    {screen === SCREEN.HIGH_SCORES && <HighScores {...{showMainMenu}} />}
  </div>
)
const Reacteroids = inject(({application:{renderer, screen}, game:{shipCount}}) => ({renderer, screen, shipCount}))(ReacteroidsComponent)

document.title = 'Reacteroids MobX'

render(
  <Provider {...{application, game, stage, startGame, saveScore, showHighScores, showMainMenu}}>
    <Reacteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
