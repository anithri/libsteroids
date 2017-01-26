import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
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

  render = () =>
  {
    const {x, y, rotation} = this.props

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
  render = () =>
  {
    const {container, polygons} = this.props

    if (polygons.length > 0)
      return <polygons>{polygons.map(({id, x, y, rotation, vertices}) => <PixiPolygon key={id} {...{x, y, rotation, vertices, container}} />)}</polygons>

    return null
  }

  componentDidUpdate = ({renderContainer}) => renderContainer()
}

export default connect(({stage:{polygons}}) => ({polygons}))(PixiPolygons)
