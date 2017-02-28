import {Action as NgrxAction} from '@ngrx/store'
import {Enum} from 'typescript-string-enums'
import {EngineUpdate} from 'interfaces'

export const ActionType = Enum(
  'RequestEngineUpdate',
  'ReceiveEngineUpdate'
)

export interface Action extends NgrxAction
{
  update?: EngineUpdate
}

export class RequestEngineUpdateAction implements Action
{
  constructor(public type:string = ActionType.RequestEngineUpdate) {}
}

export class ReceiveEngineUpdateAction implements Action
{
  constructor(public update:EngineUpdate, public type:string = ActionType.ReceiveEngineUpdate) {}
}
