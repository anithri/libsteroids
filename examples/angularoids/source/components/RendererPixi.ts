import {Component, ElementRef, Input, ViewChild} from '@angular/core'
import {Renderer} from 'actions/application'
import {Particle, Polygon, Vertex} from 'interfaces'
import {Container, CanvasRenderer, Graphics, Renderer as PixiRenderer, WebGLRenderer, utils} from 'pixi.js'

const PARTICLE_PROTOTYPE_RADIUS:number = 5

utils.skipHello()

@Component({
  selector: 'renderer-pixi',
  template: `
    <canvas #canvas2D *ngIf="renderer === Renderer.PixiCanvas"></canvas>
    <canvas #canvas3D *ngIf="renderer === Renderer.PixiWebGL"></canvas>
  `
})
export class RendererPixi
{
  @Input()
  width:number

  @Input()
  height:number

  @Input()
  private particles:Particle[]

  @Input()
  private polygons:Polygon[]

  @Input()
  renderer:Renderer

  @ViewChild('canvas2D')
  private canvas2D:ElementRef

  @ViewChild('canvas3D')
  private canvas3D:ElementRef

  private pixiRenderer:PixiRenderer

  private container:Container = new Container()

  private graphics:Map<string, Graphics> = new Map<string, Graphics>()

  private particlePrototype:Graphics = new Graphics()

  private Renderer = Renderer

  constructor()
  {
    this.particlePrototype
      .beginFill(0xFFFFFF)
      .drawCircle(0, 0, PARTICLE_PROTOTYPE_RADIUS)
      .endFill()
  }

  private ngOnChanges(changes:any):void
  {
    if (changes.renderer)
    {
      delete this.pixiRenderer

      return
    }

    const currentIDs:Set<string> = new Set<string>()

    if (!this.pixiRenderer)
    {
      const canvas:ElementRef = this.renderer === Renderer.PixiCanvas ? this.canvas2D : this.canvas3D

      if (canvas)
      {
        const RendererClass:PixiRenderer = this.renderer === Renderer.PixiCanvas ? CanvasRenderer : WebGLRenderer

        this.pixiRenderer = new RendererClass(this.width, this.height, {antialias: true, autoResize: true, resolution: devicePixelRatio || 1, view: canvas.nativeElement})
      }
    }

    else if (changes.width
    || changes.height)
    {
      const width:number = changes.width ? changes.width.currentValue : this.width
      const height:number = changes.height ? changes.height.currentValue : this.height

      this.pixiRenderer.resize(width, height)
    }

    if (changes.particles)
    {
      const particles:Particle[] = changes.particles.currentValue

      particles.forEach((particle:Particle) =>
      {
        const {id, x, y, radius} = particle
        const scale = radius / PARTICLE_PROTOTYPE_RADIUS
        let graphics:Graphics

        currentIDs.add(id)

        if (this.graphics.size > 0
        && this.graphics.has(id))
          graphics = this.graphics.get(id)

        else
        {
          graphics = this.particlePrototype.clone()

          this.container.addChild(graphics)
          this.graphics.set(id, graphics)
        }

        graphics.setTransform(x, y, scale, scale)
      })
    }

    if (changes.polygons)
    {
      const polygons:Polygon[] = changes.polygons.currentValue

      polygons.forEach((polygon:Polygon) =>
      {
        const {id, x, y, rotation} = polygon
        let graphics:Graphics

        currentIDs.add(id)

        if (this.graphics.size > 0
        && this.graphics.has(id))
          graphics = this.graphics.get(id)

        else
        {
          const {vertices} = polygon

          graphics = new Graphics()

          graphics
            .lineStyle(2, 0xFFFFFF, 1)
            .moveTo(vertices[0].x, vertices[0].y)

          vertices.forEach((vertex:Vertex, index:number) =>
          {
            if (index > 0)
              graphics.lineTo(vertex.x, vertex.y)
          })

          graphics
            .lineTo(vertices[0].x, vertices[0].y)
            .endFill()

          this.container.addChild(graphics)
          this.graphics.set(id, graphics)
        }

          Object.assign(graphics, {x:x || 0, y:y || 0, rotation: rotation ? rotation * Math.PI / 180 : 0})
      })
    }

    this.graphics.forEach((graphics:Graphics, key:string) =>
    {
      if (!currentIDs.has(key))
      {
        this.container.removeChild(this.graphics.get(key))
        this.graphics.delete(key)
      }
    })

    this.pixiRenderer.render(this.container)
  }
}
