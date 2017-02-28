import {Particle} from 'interfaces/Particle'
import {Polygon} from 'interfaces/Polygon'

export interface EngineUpdate
{
  events?: string[]
  level?: number
  particles?: Particle[]
  polygons?: Polygon[]
  score?: number
}
