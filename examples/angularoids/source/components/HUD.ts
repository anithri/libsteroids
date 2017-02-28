import 'css/HUD.css'
import {Component, Input} from '@angular/core'
import {Renderer} from 'actions/application'
import {HighScore} from 'interfaces'

@Component({
  selector: 'hud',
  template: `
    <score>Score: {{score}}</score>
    <score class="top-score">Top Score: {{topScore}}</score>
    <level>Level: {{level}}</level>
    <controls>
      Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br />
      Use [SPACE] to SHOOT<br />
      Use [SHIFT] to HYPERSPACE<br />
      Use [1] to render with SVG {{renderer === Renderer.SVG ? '*' : ''}}<br />
      Use [2] to render with CANVAS {{renderer === Renderer.Canvas ? '*' : ''}}<br />
      Use [3] to render with PIXI (CANVAS) {{renderer === Renderer.PixiCanvas ? '*' : ''}}<br />
      Use [4] to render with PIXI (WEBGL) {{renderer === Renderer.PixiWebGL ? '*' : ''}}<br />
      Use [5] to render with THREE {{renderer === Renderer.Three ? '*' : ''}}
    </controls>
  `
})
export class HUD
{
  @Input()
  private set highScores(highScores:HighScore[])
  {
    this.topScore = highScores.length > 0 ? highScores[0].score : 0
  }

  @Input()
  private level:number

  @Input()
  private score:number

  @Input()
  private renderer:Renderer

  private topScore:number

  private Renderer = Renderer
}
