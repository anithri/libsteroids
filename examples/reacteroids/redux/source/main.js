import 'css/Libsteroids.css'
import React from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {RENDERER, SCREEN} from 'constants'
import {saveScore, startGame, store} from 'state'
import {showHighScores, showMainMenu} from 'state/actions/application'
import AudioComponent from 'components/Audio'
import GameOverComponent from 'components/GameOver'
import HighScoresComponent from 'components/HighScores'
import HUDComponent from 'components/HUD'
import MainMenuComponent from 'components/MainMenu'
import RendererCanvasComponent from 'components/RendererCanvas'
import RendererPixiComponent from 'components/RendererPixi'
import RendererSVGComponent from 'components/RendererSVG'
import RendererThreeComponent from 'components/RendererThree'

const Audio = connect(({game:{events}}) => ({events}))(AudioComponent)
const GameOver = connect(({application:{username}, game:{score}}) => ({score, username}))(GameOverComponent)
const HighScores = connect(({application:{highScores}}) => ({highScores}), dispatch => bindActionCreators({showMainMenu}, dispatch))(HighScoresComponent)
const HUD = connect(({application: {renderer, highScores}, game: {level, score}}) => ({level, renderer, score, topScore: highScores.length > 0 ? highScores[0].score : 0}))(HUDComponent)
const MainMenu = connect(null, dispatch => bindActionCreators({showHighScores}, dispatch))(MainMenuComponent)
const RendererCanvas = connect(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(RendererCanvasComponent)
const RendererPixi = connect(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(RendererPixiComponent)
const RendererSVG = connect(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(RendererSVGComponent)
const RendererThree = connect(({stage:{width, height, particles, polygons}}) => ({width, height, particles, polygons}))(RendererThreeComponent)
const ReacteroidsComponent = ({renderer, screen, shipCount}) => (
  <div>
    <Audio />
    {renderer === RENDERER.SVG && <RendererSVG />}
    {renderer === RENDERER.CANVAS && <RendererCanvas />}
    {[RENDERER.PIXI_CANVAS, RENDERER.PIXI_WEBGL].includes(renderer) && <RendererPixi />}
    {renderer === RENDERER.THREE && <RendererThree />}
    {screen === SCREEN.MAIN_MENU && <MainMenu {...{startGame}} />}
    {screen === SCREEN.GAME && shipCount > 0 && <HUD />}
    {screen === SCREEN.GAME && shipCount === 0 && <GameOver {...{saveScore}} />}
    {screen === SCREEN.HIGH_SCORES && <HighScores />}
  </div>
)
const Reacteroids = connect(({application:{renderer, screen}, game:{shipCount}}) => ({renderer, screen, shipCount}))(ReacteroidsComponent)

document.title = 'Reacteroids Redux'

render(
  <Provider {...{store}}>
    <Reacteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
