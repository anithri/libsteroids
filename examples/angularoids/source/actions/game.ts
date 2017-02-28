import {Action as NgrxAction} from '@ngrx/store'
import {Enum} from 'typescript-string-enums'

export const ActionType = Enum(
  'SetEvents',
  'SetLevel',
  'SetScore'
)

export interface Action extends NgrxAction
{
  events?: string[]
  level?: number
  score?: number
}

export class SetEventsAction implements Action
{
  constructor(public events:string[], public type:string = ActionType.SetEvents) {}
}

export class SetLevelAction implements Action
{
  constructor(public level:number, public type:string = ActionType.SetLevel) {}
}

export class SetScoreAction implements Action
{
  constructor(public score:number, public type:string = ActionType.SetScore) {}
}
