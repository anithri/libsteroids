import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'inferno-redux'

class SVGPolygon extends Component
{
  componentWillMount = () =>
  {
    const {vertices} = this.props
    let data = ''

    vertices.forEach(({x, y}, index) => data += (index === 0 ? 'M ' : 'L ') + x + ' ' + y)

    data += 'L ' + vertices[0].x + ' ' + vertices[0].y

    this.path = <path d={data} fill-opacity="0" stroke="white" stroke-width="2" />
  }

  render({x, y, rotation})
  {
    if (!x && !y && !rotation)
      return <g>{this.path}</g>

    const transform = []

    if (x || y)
      transform.push('translate(' + (x || 0) + ' ' + (y || 0) + ')')

    if (rotation)
      transform.push('rotate(' + rotation + ')')

    return <g transform={transform.join(' ')}>{this.path}</g>
  }

  componentWillUnmount = () => this.path = null
}

const SVGPolygons =({polygons}) =>
{
  if (polygons.length > 0)
    return <g>{polygons.length > 0 && polygons.map(({id, x, y, rotation, vertices}) => <SVGPolygon {...{key:id, x, y, rotation, vertices}} />)}</g>

  return null
}

export default connect(({stage:{polygons}}) => ({polygons}))(SVGPolygons)
