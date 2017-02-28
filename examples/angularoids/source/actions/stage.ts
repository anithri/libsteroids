import {Action as NgrxAction} from '@ngrx/store'
import {Enum} from 'typescript-string-enums'
import {Particle, Polygon} from 'interfaces'

export const ActionType = Enum(
  'Resize',
  'SetParticles',
  'SetPolygons'
)

export interface Action extends NgrxAction
{
  particles?: Particle[]
  polygons?: Polygon[]
}

export class ResizeAction implements Action
{
  constructor(public type:string = ActionType.Resize) {}
}

export class SetParticlesAction implements Action
{
  constructor(public particles:Particle[], public type:string = ActionType.SetParticles) {}
}

export class SetPolygonsAction implements Action
{
  constructor(public polygons:Polygon[], public type:string = ActionType.SetPolygons) {}
}
