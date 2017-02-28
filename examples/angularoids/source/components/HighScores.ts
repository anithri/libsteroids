import 'css/HighScores.css'
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core'
import {HighScore} from 'interfaces'

@Component({
  selector: 'high-scores',
  template: `
    <numbers [innerHTML]="numbers"></numbers>
    <names [innerHTML]="names"></names>
    <scores [innerHTML]="scores"></scores>
    <button #exitButton (click)="exit()">MAIN MENU</button>
  `
})
export class HighScores
{
  @Input()
  private set highScores(highScores:HighScore[])
  {
    this.names = '<h2>NAME</h2>' + highScores.map((highScore:HighScore) => highScore.username).join('<br />')
    this.scores = '<h2>SCORES</h2>' + highScores.map((highScore:HighScore) => highScore.score).join('<br />')
  }

  @Output()
  private onExit:EventEmitter<any> = new EventEmitter()

  @ViewChild('exitButton')
  private exitButton:ElementRef

  private numbers:string = '<h2>&nbsp;</h2>' + Array.from(new Array(10), (val:number, index:number) => index + 1).join('<br />')

  private names:string

  private scores:string

  private exit():void
  {
    this.onExit.emit()
  }

  private ngAfterViewInit():void
  {
    this.exitButton.nativeElement.focus()
  }
}
