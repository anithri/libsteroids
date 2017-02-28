import 'css/Libsteroids.css'
import React from 'react'
import {inject, observer} from 'mobx-react'
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

const ReacteroidsComponent = ({renderer, screen}) => (
  <reacteroids>
    {renderer === Renderer.SVG && <RendererSVG />}
    {renderer === Renderer.Canvas && <RendererCanvas />}
    {[Renderer.PixiCanvas, Renderer.PixiWebGL].includes(renderer) && <RendererPixi />}
    {renderer === Renderer.Three && <RendererThree />}
    {screen === Screen.MainMenu && <MainMenu />}
    {screen === Screen.Game && <HUD />}
    {screen === Screen.Game && <Sounds />}
    {screen === Screen.GameOver && <GameOver />}
    {screen === Screen.SaveScore && <SaveScore />}
    {screen === Screen.HighScores && <HighScores />}
  </reacteroids>
)

function mapStateToProps({application:{renderer, screen}})
{
  return {renderer, screen}
}

const Reacteroids = inject(mapStateToProps)(ReacteroidsComponent)

export default Reacteroids
