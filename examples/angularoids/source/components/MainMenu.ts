import 'css/MainMenu.css'
import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core'

@Component({
  selector: 'main-menu',
  template: `
    <h1>ANGULAROIDS</h1>
    <button #playGameButton (click)="playGame()">PLAY GAME</button>
    <button (click)="showHighScores()">HIGH SCORES</button>
  `
})
export class MainMenu
{
  @Output()
  private onPlayGameButtonClicked:EventEmitter<any> = new EventEmitter()

  @Output()
  private onHighScoresButtonClicked:EventEmitter<any> = new EventEmitter()

  @ViewChild('playGameButton')
  private playGameButton:ElementRef

  private ngAfterViewInit():void
  {
    this.playGameButton.nativeElement.focus()
  }

  private playGame():void
  {
    this.onPlayGameButtonClicked.emit()
  }

  private showHighScores():void
  {
    this.onHighScoresButtonClicked.emit()
  }
}
