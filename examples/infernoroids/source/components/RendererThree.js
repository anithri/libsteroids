import Component from 'inferno-component'
import {connect} from 'inferno-redux'
import {CircleGeometry, DoubleSide, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, OrthographicCamera, Path, Scene, Vector2, WebGLRenderer} from 'three'

const PARTICLE_PROTOTYPE_RADIUS = 5

const particlePrototype = new Mesh(new CircleGeometry(PARTICLE_PROTOTYPE_RADIUS, 20), new MeshBasicMaterial({side:DoubleSide}))
const lineMaterial = new LineBasicMaterial({linewidth: 2})

class Particle extends Component
{
  componentWillMount()
  {
    this.mesh = particlePrototype.clone()
    this.props.scene.add(this.mesh)
  }

  render({x, y, radius})
  {
    const scale = radius / PARTICLE_PROTOTYPE_RADIUS

    this.mesh.position.set(x, y, 0)
    this.mesh.scale.set(scale, scale, 1)

    return null
  }

  componentWillUnmount()
  {
    this.props.scene.remove(this.mesh)
  }
}

class Polygon extends Component
{
  componentWillMount()
  {
    const {scene, vertices} = this.props
    const points = vertices.map(({x, y}) => new Vector2(x, y)).concat(new Vector2(vertices[0].x, vertices[0].y))

    this.line = new Line(new Path(points).createPointsGeometry(points.length), lineMaterial)

    scene.add(this.line)
  }

  render({x, y, rotation})
  {
    this.line.position.set(x, y, 0)
    this.line.rotation.set(0, 0, rotation * Math.PI / 180)

    return null
  }

  componentWillUnmount()
  {
    this.props.scene.remove(this.line)
  }
}

class RendererThree extends Component
{
  componentWillMount()
  {
    const {width, height} = this.props

    this.scene = new Scene()
    this.camera = new OrthographicCamera(0, width, 0, height, 0, 1)
    this.renderer = new WebGLRenderer({antialias: true})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)
  }

  render({particles, polygons})
  {
    return (
      <renderer-three ref={wrapper => this.wrapper = wrapper}>
        {particles.length > 0 && <particles>{particles.map(({id, x, y, radius}) => <Particle {...{key:id, x, y, radius, scene: this.scene}} />)}</particles>}
        {polygons.length > 0 && <polygons>{polygons.map(({id, x, y, rotation, vertices}) => <Polygon {...{key:id, x, y, rotation, vertices, scene: this.scene}} />)}</polygons>}
      </renderer-three>
    )
  }

  componentDidMount()
  {
    this.wrapper.appendChild(this.renderer.domElement)
  }

  componentDidUpdate()
  {
    this.renderer.render(this.scene, this.camera)
  }
}

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

export default connect(mapStateToProps)(RendererThree)
