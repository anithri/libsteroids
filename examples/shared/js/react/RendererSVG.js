import React, {Component} from 'react'

const Particle = ({x, y, radius}) => <circle cx={x} cy={y} r={radius} fill="white" />

class Polygon extends Component
{
  componentWillMount()
  {
    const {vertices} = this.props
    let data = ''

    vertices.forEach(({x, y}, index) => data += (index === 0 ? 'M ' : 'L ') + x + ' ' + y)

    data += 'L ' + vertices[0].x + ' ' + vertices[0].y

    this.path = <path d={data} fillOpacity="0" stroke="white" strokeWidth="2" />
  }

  render()
  {
    const {x, y, rotation} = this.props

    if (!x && !y && !rotation)
      return <g>{this.path}</g>

    const transform = []

    if (x || y)
      transform.push('translate(' + (x || 0) + ' ' + (y || 0) + ')')

    if (rotation)
      transform.push('rotate(' + rotation + ')')

    return <g transform={transform.join(' ')}>{this.path}</g>
  }
}

const Renderer = ({width, height, particles, polygons}) => (
  <svg {...{width, height}}>
    {particles.length > 0 && <g>{particles.length > 0 && particles.map(({id, x, y, radius}) => <Particle {...{key:id, x, y, radius}} />)}</g>}
    {polygons.length > 0 && <g>{polygons.length > 0 && polygons.map(({id, x, y, rotation, vertices}) => <Polygon {...{key:id, x, y, rotation, vertices}} />)}</g>}
  </svg>
)

export default Renderer
