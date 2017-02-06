import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'inferno-redux'
import {Container, CanvasRenderer, Graphics, WebGLRenderer, utils} from 'pixi.js'
import {RENDERER} from 'constants'

const PARTICLE_PROTOTYPE_RADIUS = 5

const particlePrototype = new Graphics()

particlePrototype
  .beginFill(0xFFFFFF)
  .drawCircle(0, 0, PARTICLE_PROTOTYPE_RADIUS)
  .endFill()

utils.skipHello()

class Particle extends Component
{
  componentWillMount = () =>
  {
    this.graphics = particlePrototype.clone()
    this.props.container.addChild(this.graphics)
  }

  render = ({x, y, radius}) =>
  {
    const scale = radius / PARTICLE_PROTOTYPE_RADIUS

    this.graphics.setTransform(x, y, scale, scale)

    return null
  }

  componentWillUnmount = () => this.graphics.destroy()
}

class Polygon extends Component
{
  componentWillMount = () =>
  {
    const {container, vertices} = this.props
    const graphics = this.graphics = new Graphics()

    graphics
      .lineStyle(2, 0xFFFFFF, 1)
      .moveTo(vertices[0].x, vertices[0].y)

    vertices.forEach((vertex, index) =>
    {
      if (index > 0)
        graphics.lineTo(vertex.x, vertex.y)
    })

    graphics
      .lineTo(vertices[0].x, vertices[0].y)
      .endFill()

    container.addChild(graphics)
  }

  render = ({x, y, rotation}) =>
  {
    Object.assign(this.graphics, {x:x || 0, y:y || 0, rotation: rotation ? rotation * Math.PI / 180 : 0})

    return null
  }

  componentWillUnmount = () => this.graphics.destroy()
}

class Renderer extends Component
{
  createRenderer = ({width, height, renderer}) =>
  {
    const Renderer = renderer === RENDERER.PIXI_CANVAS ? CanvasRenderer : WebGLRenderer

    this.rendererType = renderer

    if (this.renderer)
      this.renderer.destroy(true)

    this.renderer = new Renderer(width, height, {antialias: true, autoResize:true, resolution: devicePixelRatio || 1})

    document.body.insertBefore(this.renderer.view, document.body.lastChild)
  }

  componentWillMount = () =>
  {
    this.container = new Container()
    this.createRenderer(this.props)
  }

  componentWillUpdate = props =>
  {
    if (props.renderer !== this.rendererType)
      this.createRenderer(props)
  }

  render = ({particles, polygons}) => (
    <stage hidden>
      {particles.length > 0 && <particles>{particles.map(({id, x, y, radius}) => <Particle {...{key:id, x, y, radius, container: this.container}} />)}</particles>}
      {polygons.length > 0 && <polygons>{polygons.map(({id, x, y, rotation, vertices}) => <Polygon {...{key:id, x, y, rotation, vertices, container: this.container}} />)}</polygons>}
    </stage>
  )

  componentDidUpdate = () => this.renderer.render(this.container)

  componentWillUnmount = () =>
  {
    this.container.destroy()
    this.renderer.destroy(true)
  }
}

export default connect(({application:{renderer}, stage:{width, height, particles, polygons}}) => ({width, height, renderer, particles, polygons}))(Renderer)
