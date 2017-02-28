import React, {Component} from 'react'
import {Container, CanvasRenderer, Graphics, WebGLRenderer, utils} from 'pixi.js'
import {Renderer} from 'constants'

const PARTICLE_PROTOTYPE_RADIUS = 5

const particlePrototype = new Graphics()

particlePrototype
  .beginFill(0xFFFFFF)
  .drawCircle(0, 0, PARTICLE_PROTOTYPE_RADIUS)
  .endFill()

utils.skipHello()

class Particle extends Component
{
  componentWillMount()
  {
    this.graphics = particlePrototype.clone()
    this.props.container.addChild(this.graphics)
  }

  render()
  {
    const {x, y, radius} = this.props
    const scale = radius / PARTICLE_PROTOTYPE_RADIUS

    this.graphics.setTransform(x, y, scale, scale)

    return null
  }

  componentWillUnmount()
  {
    this.graphics.destroy()
  }
}

class Polygon extends Component
{
  componentWillMount()
  {
    const {container, vertices} = this.props
    const graphics = this.graphics = new Graphics()

    graphics
      .lineStyle(2, 0xFFFFFF, 1)
      .moveTo(vertices[0].x, vertices[0].y)

    vertices.forEach(({x, y}, index) =>
    {
      if (index > 0)
        graphics.lineTo(x, y)
    })

    graphics
      .lineTo(vertices[0].x, vertices[0].y)
      .endFill()

    container.addChild(graphics)
  }

  render()
  {
    const {x, y, rotation} = this.props

    Object.assign(this.graphics, {x:x || 0, y:y || 0, rotation: rotation ? rotation * Math.PI / 180 : 0})

    return null
  }

  componentWillUnmount()
  {
    this.graphics.destroy()
  }
}

export default class RendererPixi extends Component
{
  createRenderer()
  {
    const {width, height, renderer} = this.props
    const RendererClass = renderer === Renderer.PixiCanvas ? CanvasRenderer : WebGLRenderer

    this.rendererType = renderer

    if (this.renderer)
      this.renderer.destroy(true)

    this.renderer = new RendererClass(width, height, {antialias: true, autoResize:true, resolution: devicePixelRatio || 1})
    this.wrapper.appendChild(this.renderer.view)
  }

  componentWillMount()
  {
    this.container = new Container()
  }

  render()
  {
    const {width, height, particles, polygons} = this.props

    return (
      <renderer-pixi ref={wrapper => this.wrapper = wrapper}>
        {particles.length > 0 && <particles>{particles.map(({id, x, y, radius}) => <Particle {...{key:id, x, y, radius, container: this.container}} />)}</particles>}
        {polygons.length > 0 && <polygons>{polygons.map(({id, x, y, rotation, vertices}) => <Polygon {...{key:id, x, y, rotation, vertices, container: this.container}} />)}</polygons>}
      </renderer-pixi>
    )
  }

  componentDidMount()
  {
    this.createRenderer()
    this.renderer.render(this.container)
  }

  componentDidUpdate({renderer})
  {
    if (renderer !== this.rendererType)
      this.createRenderer()

    this.renderer.render(this.container)
  }

  componentWillUnmount()
  {
    this.container.destroy()
    this.renderer.destroy(true)
  }
}
