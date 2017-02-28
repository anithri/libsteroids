import 'css/GameOver.css'
import {Component, Input} from '@angular/core'

@Component({
  selector: 'game-over',
  template: `
    <score>Score: {{score}}</score>
    <h1 class="centered">GAME OVER</h1>
  `
})
export class GameOver
{
  @Input()
  private score:number
}
