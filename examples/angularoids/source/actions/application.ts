import {Action as NgrxAction} from '@ngrx/store'
import {Enum} from 'typescript-string-enums'
import {HighScore} from 'interfaces'

export const ActionType = Enum(
  'SetHighScores',
  'SetRenderer',
  'SetScreen',
  'SetUsername',
  'SaveScore'
)

export const Renderer = Enum(
  'SVG',
  'Canvas',
  'PixiCanvas',
  'PixiWebGL',
  'Three'
)
export type Renderer = Enum<typeof Renderer>

export const Screen = Enum(
  'MainMenu',
  'Game',
  'GameOver',
  'SaveScore',
  'HighScores'
)
export type Screen = Enum<typeof Screen>

export interface Action extends NgrxAction
{
  highScores?: HighScore[]
  renderer?: Renderer
  score?: number
  screen?: Screen
  username?: string
}

export class SetHighScoresAction implements Action
{
  constructor(public highScores:HighScore[], public type:string = ActionType.SetHighScores)
  {
    localStorage.setItem('highScores', JSON.stringify(highScores))
  }
}

export class SetRendererAction implements Action
{
  constructor(public renderer:Renderer, public type:string = ActionType.SetRenderer) {}
}

export class SetUsernameAction implements Action
{
  constructor(public username:string, public type:string = ActionType.SetUsername) {}
}

export class SetScreenAction implements Action
{
  constructor(public screen:Screen, public type:string = ActionType.SetScreen) {}
}

export class SaveScoreAction implements Action
{
  constructor(public username:string, public type:string = ActionType.SaveScore) {}
}
