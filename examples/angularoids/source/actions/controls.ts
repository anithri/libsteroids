import {Action as NgrxAction} from '@ngrx/store'
import {Enum} from 'typescript-string-enums'

export const ActionType = Enum(
  'SetAccelerating',
  'SetHyperspace',
  'SetRotatingLeft',
  'SetRotatingRight',
  'SetShooting'
)

export interface Action extends NgrxAction
{
  accelerating?: boolean
  rotatingLeft?: boolean
  rotatingRight?: boolean
  shooting?: boolean
  hyperspace?: boolean
}

export class SetAcceleratingAction implements Action
{
  constructor(public accelerating:boolean, public type:string = ActionType.SetAccelerating) {}
}

export class SetHyperspaceAction implements Action
{
  constructor(public hyperspace:boolean, public type:string = ActionType.SetHyperspace) {}
}

export class SetRotatingLeftAction implements Action
{
  constructor(public rotatingLeft:boolean, public type:string = ActionType.SetRotatingLeft) {}
}

export class SetRotatingRightAction implements Action
{
  constructor(public rotatingRight:boolean, public type:string = ActionType.SetRotatingRight) {}
}

export class SetShootingAction implements Action
{
  constructor(public shooting:boolean, public type:string = ActionType.SetShooting) {}
}
