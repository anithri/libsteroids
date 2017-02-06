import 'css/Libsteroids.css'
import Inferno, {render} from 'inferno'
import {Provider, connect} from 'inferno-redux'
import {RENDERER, SCREEN} from 'constants'
import {store} from 'state'
import Audio from 'components/Audio'
import GameOver from 'components/GameOver'
import HighScores from 'components/HighScores'
import HUD from 'components/HUD'
import MainMenu from 'components/MainMenu'
import RendererCanvas from 'components/RendererCanvas'
import RendererPixi from 'components/RendererPixi'
import RendererSVG from 'components/RendererSVG'
import RendererThree from 'components/RendererThree'

const Infernoroids = connect(({application:{renderer, screen}, game:{shipCount}}) => ({renderer, screen, shipCount}))(({renderer, screen, shipCount}) => (
  <div>
    <Audio />
    {renderer === RENDERER.SVG && <RendererSVG />}
    {renderer === RENDERER.CANVAS && <RendererCanvas />}
    {[RENDERER.PIXI_CANVAS, RENDERER.PIXI_WEBGL].includes(renderer) && <RendererPixi />}
    {renderer === RENDERER.THREE && <RendererThree />}
    {screen === SCREEN.MAIN_MENU && <MainMenu />}
    {screen === SCREEN.GAME && shipCount > 0 && <HUD />}
    {screen === SCREEN.GAME && shipCount === 0 && <GameOver />}
    {screen === SCREEN.HIGH_SCORES && <HighScores />}
  </div>
))

document.title = 'Infernoroids'

render(
  <Provider {...{store}}>
    <Infernoroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
