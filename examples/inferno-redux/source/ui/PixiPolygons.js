import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'inferno-redux'
import {Graphics} from 'pixi.js'

class PixiPolygon extends Component
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

  componentWillUnmount = () =>
  {
    this.graphics.destroy()
    this.graphics = null
  }
}

class PixiPolygons extends Component
{
  render = ({container, polygons}) =>
  {
    if (polygons.length > 0)
      return <polygons>{polygons.map(({id, x, y, rotation, vertices}) => <PixiPolygon key={id} {...{x, y, rotation, vertices, container}} />)}</polygons>

    return null
  }

  componentDidUpdate = ({renderContainer}) => renderContainer()
}

export default connect(({stage:{polygons}}) => ({polygons}))(PixiPolygons)
