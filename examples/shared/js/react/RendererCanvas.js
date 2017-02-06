import React, {Component} from 'react'
import {rotatePoint} from 'libsteroids-engine/source/Math'

export default class Renderer extends Component
{
  componentWillMount()
  {
    this.canvas = document.body.insertBefore(document.createElement('canvas'), document.body.lastChild)
  }

  render = () =>
  {
    const {width, height, particles, polygons} = this.props
    const {canvas} = this
    let context = canvas.getContext('2d')

    if (canvas.width !== width
    || canvas.height !== height)
    {
      Object.assign(canvas, {width, height})

      context = canvas.getContext('2d')
      Object.assign(context, {fillStyle: 'white', strokeStyle: 'white', lineJoin: 'miter', lineWidth: 2})
    }

    else
      context.clearRect(0, 0, width, height)

    if (particles.length > 0)
      particles.forEach(({x, y, radius}) =>
      {
        context.beginPath()
        context.arc(x, y, radius, 0, 2 * Math.PI)
        context.fill()
      })

    if (polygons.length > 0)
    {
      context.beginPath()

      polygons.forEach(({x, y, rotation, vertices}) =>
      {
        const verticesGlobal = vertices.map(vertex =>
        {
          const point = rotatePoint(vertex, {x:0, y:0}, rotation * Math.PI / 180)

          return {
            x: Math.round((point.x + x) * 10) / 10,
            y: Math.round((point.y + y) * 10) / 10
          }
        })

        context.moveTo(verticesGlobal[0].x, verticesGlobal[0].y)

        for (let i = 1; i < verticesGlobal.length; i++)
          context.lineTo(verticesGlobal[i].x, verticesGlobal[i].y)

        context.lineTo(verticesGlobal[0].x, verticesGlobal[0].y)
      })

      context.stroke()
    }

    return null
  }

  componentWillUnmount()
  {
    document.body.removeChild(this.canvas)
  }
}
