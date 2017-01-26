/* @jsx h */
import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import {Graphics} from 'pixi.js'

const PROTOTYPE_RADIUS = 5

const prototype = new Graphics()

prototype
  .beginFill(0xFFFFFF)
  .drawCircle(0, 0, PROTOTYPE_RADIUS)
  .endFill()

class PixiParticle extends Component
{
  componentWillMount = () =>
  {
    this.graphics = prototype.clone()
    this.props.container.addChild(this.graphics)
  }

  render = ({x, y, radius}) =>
  {
    const scale = radius / PROTOTYPE_RADIUS

    this.graphics.setTransform(x, y, scale, scale)

    return null
  }

  componentWillUnmount = () =>
  {
    this.graphics.destroy()
    this.graphics = null
  }
}

const PixiParticles =({container, particles}) =>
{
  if (particles.length > 0)
    return <g>{particles.map(({id, x, y, radius}) => <PixiParticle key={id} {...{x, y, radius, container}} />)}</g>

  return null
}

export default connect(({stage}) => ({particles:stage.particles}))(PixiParticles)
