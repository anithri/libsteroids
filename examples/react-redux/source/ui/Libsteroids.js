import 'ui/Libsteroids.css'
import React from 'react'
import {connect} from 'react-redux'
import {RENDERER, SCREEN} from 'state/Application'
import Audio from 'ui/Audio'
import PixiRenderer from 'ui/PixiRenderer'
import SVGRenderer from 'ui/SVGRenderer'
import ThreeRenderer from 'ui/ThreeRenderer'
import MainMenu from 'ui/MainMenu'
import HUD from 'ui/HUD'
import GameOver from 'ui/GameOver'
import HighScores from 'ui/HighScores'

const Reacteroids = ({renderer, screen, shipCount, saveScore, showMainMenu, startGame}) => (
  <div>
    <Audio />
    {renderer === RENDERER.SVG && <SVGRenderer />}
    {[RENDERER.PIXI_CANVAS, RENDERER.PIXI_WEBGL].includes(renderer) && <PixiRenderer />}
    {renderer === RENDERER.THREE && <ThreeRenderer />}
    {screen === SCREEN.MAIN_MENU && <MainMenu {...{startGame}} />}
    {screen === SCREEN.GAME && shipCount > 0 && <HUD />}
    {screen === SCREEN.GAME && shipCount === 0 && <GameOver {...{saveScore}} />}
    {screen === SCREEN.HIGH_SCORES && <HighScores {...{showMainMenu}} />}
  </div>
)

export default connect(({application:{renderer, screen}, game:{shipCount}}) => ({renderer, screen, shipCount}))(Reacteroids)
