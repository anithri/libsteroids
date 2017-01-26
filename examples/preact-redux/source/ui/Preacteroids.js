/* @jsx h */
import 'assets/PressStart2P.woff2'
import 'ui/Preacteroids.css'
import {h} from 'preact'
import {connect} from 'preact-redux'
import {RENDERER, SCREEN} from 'state/Application'
import Audio from 'ui/Audio'
import PixiRenderer from 'ui/PixiRenderer'
import SVGRenderer from 'ui/SVGRenderer'
import ThreeRenderer from 'ui/ThreeRenderer'
import MainMenu from 'ui/MainMenu'
import HUD from 'ui/HUD'
import GameOver from 'ui/GameOver'
import HighScores from 'ui/HighScores'

const Preacteroids = ({renderer, screen, shipCount, saveScore, showMainMenu, startGame}) => (
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

export default connect(({application:{renderer, screen}, game:{shipCount}}) => ({renderer, screen, shipCount}))(Preacteroids)
