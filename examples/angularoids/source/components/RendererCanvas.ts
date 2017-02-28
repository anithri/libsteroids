import {Component, Input, ElementRef, ViewChild} from '@angular/core'
import {Particle, Polygon, Vertex} from 'interfaces'
import {rotatePoint} from 'libsteroids-engine/source/Math'
import {truncate} from 'libsteroids-examples-shared/js/Math'

interface Point
{
  x: number
  y: number
}

@Component({
  selector: 'renderer-canvas',
  template: `
    <canvas #canvas [width]="width" [height]="height"></canvas>
  `
})
export class RendererCanvas
{
  @Input()
  width:number

  @Input()
  height:number

  @Input()
  private particles:Particle[]

  @Input()
  private polygons:Polygon[]

  @ViewChild('canvas')
  private canvas:ElementRef

  private ngOnChanges(changes:any):void
  {
    const element = this.canvas.nativeElement
    const context:CanvasRenderingContext2D = element.getContext('2d')

    context.clearRect(0, 0, element.width, element.height)

    if (changes.particles)
    {
      const particles:Particle[] = changes.particles.currentValue

      Object.assign(context, {fillStyle: 'white'})

      particles.forEach(({x, y, radius}) =>
      {
        context.beginPath()
        context.arc(x, y, radius, 0, 2 * Math.PI)
        context.fill()
      })
    }

    if (changes.polygons)
    {
      const polygons:Polygon[] = changes.polygons.currentValue

      Object.assign(context, {strokeStyle: 'white', lineJoin: 'miter', lineWidth: 2})

      context.beginPath()

      polygons.forEach((polygon:Polygon) =>
      {
        const {x, y, rotation} = polygon
        const vertices:Vertex[] = polygon.vertices.map((vertex:Vertex) =>
        {
          const point:Point = rotatePoint({x:vertex.x, y:vertex.y}, {x:0, y:0}, rotation * Math.PI / 180)

          return {
            x: truncate(point.x + x, 2),
            y: truncate(point.y + y, 2)
          }
        })

        context.moveTo(vertices[0].x, vertices[0].y)

        for (let i = 1; i < vertices.length; i++)
          context.lineTo(vertices[i].x, vertices[i].y)

        context.lineTo(vertices[0].x, vertices[0].y)
      })

      context.stroke()
    }
  }
}
