import 'css/Libsteroids.css'
import {Component, HostListener} from '@angular/core'
import {Store} from '@ngrx/store'
import {ResizeAction, SaveScoreAction, SetAcceleratingAction, SetHyperspaceAction, SetRotatingLeftAction, SetRotatingRightAction, SetRendererAction, SetScreenAction, SetShootingAction} from 'actions'
import {Renderer, Screen} from 'actions/application'
import {HighScore, Particle, Polygon, State} from 'interfaces'

@Component({
  selector: 'angularoids',
  template: `
    <sounds *ngIf="screen === Screen.Game" [events]="events"></sounds>
    <controls *ngIf="screen === Screen.Game" (onChange)="updateControls($event)"></controls>
    <renderer-svg *ngIf="renderer === Renderer.SVG" [width]="width" [height]="height" [particles]="particles" [polygons]="polygons"></renderer-svg>
    <renderer-canvas *ngIf="renderer === Renderer.Canvas" [width]="width" [height]="height" [particles]="particles" [polygons]="polygons"></renderer-canvas>
    <renderer-pixi *ngIf="renderer === Renderer.PixiCanvas || renderer === Renderer.PixiWebGL" [width]="width" [height]="height" [particles]="particles" [polygons]="polygons" [renderer]="renderer"></renderer-pixi>
    <renderer-three *ngIf="renderer === Renderer.Three" [width]="width" [height]="height" [particles]="particles" [polygons]="polygons"></renderer-three>
    <main-menu *ngIf="screen === Screen.MainMenu" class="centered" (onPlayGameButtonClicked)="startGame()" (onHighScoresButtonClicked)="showHighScores()"></main-menu>
    <hud *ngIf="screen === Screen.Game" [highScores]="highScores" [level]="level" [score]="score" [renderer]="renderer"></hud>
    <game-over *ngIf="screen === Screen.GameOver" [score]="score"></game-over>
    <save-score *ngIf="screen === Screen.SaveScore" [username]="username" (onSubmit)="saveScore($event)"></save-score>
    <high-scores *ngIf="screen === Screen.HighScores" class="centered" [highScores]="highScores" (onExit)="showMainMenu()"></high-scores>
  `
})
export class Angularoids
{
  private rendererSelectKeys:Set<string> = new Set(['1', '2', '3', '4', '5'])

  private Renderer = Renderer

  private Screen = Screen

  private highScores:HighScore[]

  private renderer:Renderer

  private screen:Screen

  private username:string

  private events:string[]

  private level:number

  private score:number

  private width:number

  private height:number

  private particles:Particle[]

  private polygons:Polygon[]

  constructor(private store:Store<State>)
  {
    store.select('application', 'highScores').subscribe((highScores:HighScore[]) => this.highScores = highScores)
    store.select('application', 'renderer').subscribe((renderer:Renderer) => this.renderer = renderer)
    store.select('application', 'screen').subscribe((screen:Screen) => this.screen = screen)
    store.select('application', 'username').subscribe((username:string) => this.username = username)
    store.select('game', 'events').subscribe((events:string[]) => events.length > 0 ? this.events = events : null)
    store.select('game', 'level').subscribe((level:number) => this.level = level)
    store.select('game', 'score').subscribe((score:number) => this.score = score)
    store.select('stage', 'width').subscribe((width:number) => this.width = width)
    store.select('stage', 'height').subscribe((height:number) => this.height = height)
    store.select('stage', 'particles').subscribe((particles:Particle[]) => this.particles = particles)
    store.select('stage', 'polygons').subscribe((polygons:Polygon[]) => this.polygons = polygons)
  }

  private startGame():void
  {
    this.store.dispatch(new SetScreenAction(Screen.Game))
  }

  private showHighScores():void
  {
    this.store.dispatch(new SetScreenAction(Screen.HighScores))
  }

  private showMainMenu():void
  {
    this.store.dispatch(new SetScreenAction(Screen.MainMenu))
  }

  private saveScore($event):void
  {
    this.store.dispatch(new SaveScoreAction($event.username))
  }

  private updateControls($event):void
  {
    const property:string = Object.keys($event)[0]
    const value = $event[property]

    switch (property)
    {
      case 'accelerating':
        return this.store.dispatch(new SetAcceleratingAction(value))

      case 'hyperspace':
        return this.store.dispatch(new SetHyperspaceAction(value))

      case 'rotatingLeft':
        return this.store.dispatch(new SetRotatingLeftAction(value))

      case 'rotatingRight':
        return this.store.dispatch(new SetRotatingRightAction(value))

      case 'shooting':
        return this.store.dispatch(new SetShootingAction(value))
    }
  }

  @HostListener('window:keydown', ['$event'])
  private handleKeyDown(event:KeyboardEvent):void
  {
    if (this.rendererSelectKeys.has(event.key))
    {
      switch (event.key)
      {
        case '1':
          return this.store.dispatch(new SetRendererAction(Renderer.SVG))

        case '2':
          return this.store.dispatch(new SetRendererAction(Renderer.Canvas))

        case '3':
          return this.store.dispatch(new SetRendererAction(Renderer.PixiCanvas))

        case '4':
          return this.store.dispatch(new SetRendererAction(Renderer.PixiWebGL))

        case '5':
          return this.store.dispatch(new SetRendererAction(Renderer.Three))
      }
    }
  }

  @HostListener('window:resize')
  private handleResize():void
  {
    this.store.dispatch(new ResizeAction())
  }
}
