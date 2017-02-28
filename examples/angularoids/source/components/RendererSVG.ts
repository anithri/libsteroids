import {Component, Input} from '@angular/core'
import {Particle, Polygon, Vertex} from 'interfaces'

interface SVGCircle {
  cx: number
  cy: number
  r: number
}

interface SVGPolygon {
  transform: string
  points: string
}

@Component({
  selector: 'renderer-svg',
  template: `
    <svg [attr.width]="width" [attr.height]="height">
      <svg:g *ngIf="svgCircles.length > 0" style="fill:white;">
        <svg:circle *ngFor="let circle of svgCircles" [attr.cx]="circle.cx" [attr.cy]="circle.cy" [attr.r]="circle.r" />
      </svg:g>
      <svg:g *ngIf="svgPolygons.length > 0" style="fill-opacity: 0; stroke: white; stroke-width: 2">
        <svg:g *ngFor="let polygon of svgPolygons" [attr.transform]="polygon.transform">
          <svg:polygon [attr.points]="polygon.points" />
        </svg:g>
      </svg:g>
    </svg>
  `
})
export class RendererSVG
{
  @Input()
  width:number

  @Input()
  height:number

  @Input()
  private particles:Particle[]

  @Input()
  private polygons:Polygon[]

  private svgCircles:SVGCircle[]

  private svgPolygons:SVGPolygon[]

  private idCircleMap:Map<string, SVGCircle> = new Map<string, SVGCircle>()

  private idPolygonMap:Map<string, SVGPolygon> = new Map<string, SVGPolygon>()

  private ngOnChanges(changes:any):void
  {
    let currentIDs:Set<string>

    if (changes.particles)
    {
      const particles:Particle[] = changes.particles.currentValue

      currentIDs = new Set<string>()

      particles.forEach((particle:Particle) =>
      {
        const {id, x, y, radius} = particle
        let svgCircle:SVGCircle

        currentIDs.add(id)

        if (this.idCircleMap.size > 0
        && this.idCircleMap.has(id))
          Object.assign(this.idCircleMap.get(id), {cx:x, cy:y, r:radius})

        else
          this.idCircleMap.set(id, Object.assign({}, {cx:x, cy:y, r:radius}))
      })

      this.idCircleMap.forEach((circle:SVGCircle, key:string) =>
      {
        if (!currentIDs.has(key))
          this.idCircleMap.delete(key)
      })

      this.svgCircles = Array.from(this.idCircleMap.values())
    }

    if (changes.polygons)
    {
      const polygons:Polygon[] = changes.polygons.currentValue

      currentIDs = new Set<string>()

      polygons.forEach((polygon:Polygon) =>
      {
        const {id, x, y, rotation} = polygon
        const transform:string = `translate(${x} ${y}) rotate(${rotation})`
        let svgPolygon:SVGPolygon

        currentIDs.add(id)

        if (this.idPolygonMap.size > 0
        && this.idPolygonMap.has(id))
          Object.assign(this.idPolygonMap.get(id), {transform})

        else
          this.idPolygonMap.set(id, Object.assign({}, {transform, points: polygon.vertices.reduce((points:string, vertex:Vertex) => points += `${vertex.x},${vertex.y} `, '')}))
      })

      this.idPolygonMap.forEach((polygon:SVGPolygon, key:string) =>
      {
        if (!currentIDs.has(key))
          this.idPolygonMap.delete(key)
      })

      this.svgPolygons = Array.from(this.idPolygonMap.values())
    }
  }
}
