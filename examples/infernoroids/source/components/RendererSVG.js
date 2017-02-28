import Component from 'inferno-component'
import {connect} from 'inferno-redux'

const Particle = ({x, y, radius}) => <circle cx={x} cy={y} r={radius} />

class Polygon extends Component
{
  componentWillMount()
  {
    this.polygon = <polygon points={this.props.vertices.reduce((points, vertex) => points += `${vertex.x},${vertex.y} `, '')} />
  }

  render({x, y, rotation})
  {
    return <g transform={'translate(' + x + ' ' + y + ') rotate(' + rotation + ')'}>{this.polygon}</g>
  }
}

const RendererSVG = ({width, height, particles, polygons}) => (
  <renderer-svg>
    <svg {...{width, height}}>
      {particles.length > 0 && <g fill="white">{particles.length > 0 && particles.map(({id, x, y, radius}) => <Particle {...{key:id, x, y, radius}} />)}</g>}
      {polygons.length > 0 && <g fill-opacity="0" stroke="white" stroke-width="2">{polygons.length > 0 && polygons.map(({id, x, y, rotation, vertices}) => <Polygon {...{key:id, x, y, rotation, vertices}} />)}</g>}
    </svg>
  </renderer-svg>
)

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

export default connect(mapStateToProps)(RendererSVG)
