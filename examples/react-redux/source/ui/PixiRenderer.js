import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import {Container, CanvasRenderer, WebGLRenderer, utils} from 'pixi.js'
import {RENDERER} from 'state/Application'
import PixiParticles from 'ui/PixiParticles'
import PixiPolygons from 'ui/PixiPolygons'

utils.skipHello()

class PixiRenderer extends Component
{
  componentWillMount = () =>
  {
    this.container = new Container()
    this.createRenderer(this.props)
  }

  componentWillUpdate = props => this.createRenderer(props)

  createRenderer = ({width, height, renderer}) =>
  {
    const Renderer = renderer === RENDERER.PIXI_CANVAS ? CanvasRenderer : WebGLRenderer
    let view

    if (this.renderer)
      this.renderer.destroy(true)

    this.renderer = new Renderer(width, height, {antialias: true, autoResize:true, resolution: devicePixelRatio || 1})

    document.body.insertBefore(this.renderer.view, document.body.lastChild)
  }

  renderContainer = () => this.renderer.render(this.container)

  render = () =>
  {
    const {container, renderContainer} = this

    return (
      <stage hidden="true">
        <PixiParticles {...{container}} />
        <PixiPolygons {...{container, renderContainer}} />
      </stage>
    )
  }

  componentWillUnmount = () =>
  {
    this.container.destroy()
    this.container = null

    this.renderer.destroy(true)
    this.renderer = null
  }
}

export default connect(({application:{renderer}, stage:{width, height}}) => ({width, height, renderer}))(PixiRenderer)
