/* @jsx h */
import 'css/HUD.css'
import {h} from 'preact'
import {connect} from 'preact-redux'
import {Renderer} from 'constants'

const HUD = ({level, renderer, score, topScore}) => (
  <hud>
    <score>Score: {score}</score>
    <score class="top-score">Top Score: {topScore}</score>
    <level>Level: {level}</level>
    <controls>
      Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br />
      Use [SPACE] to SHOOT<br />
      Use [SHIFT] to HYPERSPACE<br />
      Use [1] to render with SVG {renderer === Renderer.SVG && "*"}<br />
      Use [2] to render with CANVAS {renderer === Renderer.Canvas && "*"}<br />
      Use [3] to render with PIXI (CANVAS) {renderer === Renderer.PixiCanvas && "*"}<br />
      Use [4] to render with PIXI (WEBGL) {renderer === Renderer.PixiWebGL && "*"}<br />
      Use [5] to render with THREE {renderer === Renderer.Three && "*"}
    </controls>
  </hud>
)

function mapStateToProps({application: {renderer, highScores}, game: {level, score}})
{
  return {level, renderer, score, topScore: highScores.length > 0 ? highScores[0].score : 0}
}

export default connect(mapStateToProps)(HUD)
