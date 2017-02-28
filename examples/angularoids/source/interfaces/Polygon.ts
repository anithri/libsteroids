import {Vertex} from 'interfaces/Vertex'

export interface Polygon
{
  id: string
  x: number
  y: number
  rotation: number
  vertices: Vertex[]
}
