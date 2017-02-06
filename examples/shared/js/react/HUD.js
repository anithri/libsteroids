import 'css/HUD.css'
import React from 'react'
import {RENDERER} from 'constants'

const HUD = ({level, renderer, score, topScore}) => (
  <div>
    <div className="score current-score">
      Score: {score}<br />
      Level: {level}
    </div>
    <div className="score top-score">Top Score: {topScore}</div>
    <div className="controls">
      Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br />
      Use [SPACE] to SHOOT<br />
      Use [SHIFT] to HYPERSPACE<br />
      Use [1] to render with SVG {renderer === RENDERER.SVG && "*"}<br />
      Use [2] to render with CANVAS {renderer === RENDERER.CANVAS && "*"}<br />
      Use [3] to render with PIXI (CANVAS) {renderer === RENDERER.PIXI_CANVAS && "*"}<br />
      Use [4] to render with PIXI (WEBGL) {renderer === RENDERER.PIXI_WEBGL && "*"}<br />
      Use [5] to render with THREE {renderer === RENDERER.THREE && "*"}
    </div>
  </div>
)

export default HUD
