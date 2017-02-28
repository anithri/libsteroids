import {Component, ElementRef, Input, ViewChild} from '@angular/core'
import {Particle, Polygon, Vertex} from 'interfaces'
import {CircleGeometry, DoubleSide, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, OrthographicCamera, Path, Scene, Vector2, WebGLRenderer} from 'three'

const PARTICLE_PROTOTYPE_RADIUS = 5

@Component({
  selector: 'renderer-three',
  template: `
    <canvas #canvas></canvas>
  `
})
export class RendererThree
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

  private lines:Map<string, Line> = new Map<string, Line>()

  private meshes:Map<string, Mesh> = new Map<string, Mesh>()

  private particlePrototype:Mesh = new Mesh(new CircleGeometry(PARTICLE_PROTOTYPE_RADIUS, 20), new MeshBasicMaterial({side:DoubleSide}))

  private lineMaterial:LineBasicMaterial = new LineBasicMaterial({linewidth: 2})

  private scene:Scene

  private camera:OrthographicCamera

  private renderer:WebGLRenderer

  private ngOnChanges(changes:any):void
  {
    let currentIDs:Set<string>

    if (!this.renderer)
    {
      this.scene = new Scene()
      this.camera = new OrthographicCamera(0, this.width, 0, this.height, 0, 1)
      this.renderer = new WebGLRenderer({antialias: true, canvas: this.canvas.nativeElement})
      this.renderer.setPixelRatio(devicePixelRatio)
      this.renderer.setSize(this.width, this.height)
    }

    else if (changes.width
    || changes.height)
    {
      const width:number = changes.width ? changes.width.currentValue : this.width
      const height:number = changes.height ? changes.height.currentValue : this.height

      this.renderer.setSize(width, height, true)
    }

    if (changes.particles)
    {
      const particles:Particle[] = changes.particles.currentValue

      currentIDs = new Set<string>()

      particles.forEach((particle:Particle) =>
      {
        const {id, x, y, radius} = particle
        const scale = radius / PARTICLE_PROTOTYPE_RADIUS
        let mesh:Mesh

        currentIDs.add(id)

        if (this.meshes.size > 0
        && this.meshes.has(id))
          mesh = this.meshes.get(id)

        else
        {
          mesh = this.particlePrototype.clone()

          this.scene.add(mesh)
          this.meshes.set(id, mesh)
        }

        mesh.position.set(x, y, 0)
        mesh.scale.set(scale, scale, 1)
      })

      this.meshes.forEach((mesh:Mesh, key:string) =>
      {
        if (!currentIDs.has(key))
        {
          this.scene.remove(this.meshes.get(key))
          this.meshes.delete(key)
        }
      })
    }

    if (changes.polygons)
    {
      const polygons:Polygon[] = changes.polygons.currentValue

      currentIDs = new Set<string>()

      polygons.forEach((polygon:Polygon) =>
      {
        const {id, x, y, rotation} = polygon
        let line:Line

        currentIDs.add(id)

        if (this.lines.size > 0
        && this.lines.has(id))
          line = this.lines.get(id)

        else
        {
          const {vertices} = polygon
          const points:Vector2[] = vertices.map((vertex:Vertex) => new Vector2(vertex.x, vertex.y)).concat(new Vector2(vertices[0].x, vertices[0].y))

          line = new Line(new Path(points).createPointsGeometry(points.length), this.lineMaterial)

          this.scene.add(line)
          this.lines.set(id, line)
        }

        line.position.set(x, y, 0)
        line.rotation.set(0, 0, rotation * Math.PI / 180)
      })

      this.lines.forEach((line:Line, key:string) =>
      {
        if (!currentIDs.has(key))
        {
          this.scene.remove(this.lines.get(key))
          this.lines.delete(key)
        }
      })
    }

    this.renderer.render(this.scene, this.camera)
  }
}
