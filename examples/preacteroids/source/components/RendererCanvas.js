/* @jsx h */
import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import {rotatePoint} from 'libsteroids-engine/source/Math'
import {truncate} from 'libsteroids-examples-shared/js/Math'

class Renderer extends Component
{
  render()
  {
    return <renderer-canvas ref={wrapper => this.wrapper = wrapper}></renderer-canvas>
  }

  componentDidMount()
  {
    const {width, height} = this.props

    this.canvas = document.createElement('canvas')

    Object.assign(this.canvas, {width, height})

    this.wrapper.appendChild(this.canvas)
  }

  componentWillUpdate({width, height, particles, polygons})
  {
    const context = this.canvas.getContext('2d')

    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    if (particles.length > 0)
    {
      Object.assign(context, {fillStyle: 'white'})

      particles.forEach(({x, y, radius}) =>
      {
        context.beginPath()
        context.arc(x, y, radius, 0, 2 * Math.PI)
        context.fill()
      })
    }

    if (polygons.length > 0)
    {
      Object.assign(context, {strokeStyle: 'white', lineJoin: 'miter', lineWidth: 2})

      context.beginPath()

      polygons.forEach(({x, y, rotation, vertices}) =>
      {
        const verticesGlobal = vertices.map(vertex =>
        {
          const point = rotatePoint({x: vertex.x, y: vertex.y}, {x:0, y:0}, rotation * Math.PI / 180)

          return {
            x: truncate(point.x + x, 2),
            y: truncate(point.y + y, 2)
          }
        })

        context.moveTo(verticesGlobal[0].x, verticesGlobal[0].y)

        for (let i = 1; i < verticesGlobal.length; i++)
          context.lineTo(verticesGlobal[i].x, verticesGlobal[i].y)

        context.lineTo(verticesGlobal[0].x, verticesGlobal[0].y)
      })

      context.stroke()
    }
  }
}

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

export default connect(mapStateToProps)(Renderer)
