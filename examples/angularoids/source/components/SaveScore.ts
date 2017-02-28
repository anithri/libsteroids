import 'css/SaveScore.css'
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core'
import {HighScore} from 'interfaces'

@Component({
  selector: 'save-score',
  template: `
    <score>Score: {{score}}</score>
    <form class="centered" (ngSubmit)="handleSubmit()">
      <h2>ENTER YOUR NAME</h2>
      <input #input type="text" maxLength="10" [value]="username" />
      <button>OK</button>
    </form>
  `
})
export class SaveScore
{
  @Input()
  private score:number

  @Input()
  private username:string

  @Output()
  private onSubmit:EventEmitter<any> = new EventEmitter()

  @ViewChild('input')
  private input:ElementRef

  private handleSubmit():void
  {
    this.onSubmit.emit({username:this.input.nativeElement.value})
  }

  private ngAfterViewInit():void
  {
    this.input.nativeElement.focus()
  }
}
