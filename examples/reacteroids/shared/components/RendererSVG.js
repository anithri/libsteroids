import React, {Component} from 'react'

const Particle = ({x, y, radius}) => <circle cx={x} cy={y} r={radius} />

class Polygon extends Component
{
  componentWillMount()
  {
    this.polygon = <polygon points={this.props.vertices.reduce((points, vertex) => points += `${vertex.x},${vertex.y} `, '')} />
  }

  render()
  {
    const {x, y, rotation} = this.props

    return <g transform={'translate(' + x + ' ' + y + ') rotate(' + rotation + ')'}>{this.polygon}</g>
  }
}

const RendererSVG = ({width, height, particles, polygons}) => (
  <renderer-svg>
    <svg {...{width, height}}>
      {particles.length > 0 && <g fill="white">{particles.map(({id, x, y, radius}) => <Particle {...{key:id, x, y, radius}} />)}</g>}
      {polygons.length > 0 && <g fillOpacity="0" stroke="white" strokeWidth="2">{polygons.map(({id, x, y, rotation, vertices}) => <Polygon {...{key:id, x, y, rotation, vertices}} />)}</g>}
    </svg>
  </renderer-svg>
)

export default RendererSVG
