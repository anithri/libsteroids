import 'assets/PressStart2P.woff2'
import 'ui/Reacteroids.css'
import React from 'react'
import {inject, observer} from 'mobx-react'
import {RENDERER, SCREEN} from 'state/Application'
import Audio from 'ui/Audio'
import PixiRenderer from 'ui/PixiRenderer'
import SVGRenderer from 'ui/SVGRenderer'
import ThreeRenderer from 'ui/ThreeRenderer'
import MainMenu from 'ui/MainMenu'
import HUD from 'ui/HUD'
import GameOver from 'ui/GameOver'
import HighScores from 'ui/HighScores'

const Reacteroids = ({renderer, screen, shipCount}) => (
  <div>
    <Audio />
    {renderer === RENDERER.SVG && <SVGRenderer />}
    {[RENDERER.PIXI_CANVAS, RENDERER.PIXI_WEBGL].includes(renderer) && <PixiRenderer />}
    {renderer === RENDERER.THREE && <ThreeRenderer />}
    {screen === SCREEN.MAIN_MENU && <MainMenu />}
    {screen === SCREEN.GAME && shipCount > 0 && <HUD />}
    {screen === SCREEN.GAME && shipCount === 0 && <GameOver />}
    {screen === SCREEN.HIGH_SCORES && <HighScores />}
  </div>
)

export default inject(({application:{renderer, screen}, game:{shipCount}}) => ({renderer, screen, shipCount}))(observer(Reacteroids))
