import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import {CircleGeometry, DoubleSide, Mesh, MeshBasicMaterial} from 'three'

const PROTOTYPE_RADIUS = 5

const prototype = new Mesh(new CircleGeometry(PROTOTYPE_RADIUS, 20), new MeshBasicMaterial({side:DoubleSide}))

class ThreeParticle extends Component
{
  componentWillMount = () =>
  {
    this.mesh = prototype.clone()
    this.props.scene.add(this.mesh)
  }

  render = () =>
  {
    const {x, y, radius} = this.props
    const scale = radius / PROTOTYPE_RADIUS

    this.mesh.position.set(x, y, 0)
    this.mesh.scale.set(scale, scale, 1)

    return null
  }

  componentWillUnmount = () =>
  {
    this.props.scene.remove(this.mesh)
    this.mesh = null
  }
}

const ThreeParticles = ({particles, scene}) =>
{
  if (particles.length > 0)
    return <g>{particles.map(({id, x, y, radius}) => <ThreeParticle key={id} {...{x, y, radius, scene}} />)}</g>

  return null
}

export default connect(({stage:{particles}}) => ({particles}))(ThreeParticles)
