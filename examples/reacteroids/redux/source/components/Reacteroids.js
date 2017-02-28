import 'css/Libsteroids.css'
import React from 'react'
import {connect} from 'react-redux'
import GameOver from 'components/GameOver'
import HighScores from 'components/HighScores'
import HUD from 'components/HUD'
import MainMenu from 'components/MainMenu'
import RendererCanvas from 'components/RendererCanvas'
import RendererPixi from 'components/RendererPixi'
import RendererSVG from 'components/RendererSVG'
import RendererThree from 'components/RendererThree'
import SaveScore from 'components/SaveScore'
import Sounds from 'components/Sounds'
import {Renderer, Screen} from 'constants'
import {saveScore, startGame} from 'libsteroids-redux'

const ReacteroidsComponent = ({renderer, screen}) => (
  <reacteroids>
    {renderer === Renderer.SVG && <RendererSVG />}
    {renderer === Renderer.Canvas && <RendererCanvas />}
    {[Renderer.PixiCanvas, Renderer.PixiWebGL].includes(renderer) && <RendererPixi />}
    {renderer === Renderer.Three && <RendererThree />}
    {screen === Screen.MainMenu && <MainMenu {...{startGame}} />}
    {screen === Screen.Game && <HUD />}
    {screen === Screen.Game && <Sounds />}
    {screen === Screen.GameOver && <GameOver />}
    {screen === Screen.SaveScore && <SaveScore {...{saveScore}} />}
    {screen === Screen.HighScores && <HighScores />}
  </reacteroids>
)

function mapStateToProps({application:{renderer, screen}})
{
  return {renderer, screen}
}

const Reacteroids = connect(mapStateToProps)(ReacteroidsComponent)

export default Reacteroids
