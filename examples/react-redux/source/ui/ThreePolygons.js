import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import {Line, LineBasicMaterial, Path, Vector2} from 'three'

const material = new LineBasicMaterial({linewidth: 2})

class ThreePolygon extends Component
{
  componentWillMount = () =>
  {
    const {scene, vertices} = this.props
    const points = vertices.map(vertex => new Vector2(vertex.x, vertex.y))
    const path = new Path(points)

    path.autoClose = true

    this.line = new Line(path.createPointsGeometry(points.length), material)

    scene.add(this.line)
  }

  render = () =>
  {
    const {x, y, rotation} = this.props

    this.line.position.set(x, y, 0)
    this.line.rotation.set(0, 0, rotation * Math.PI / 180)

    return null
  }

  componentWillUnmount = () =>
  {
    this.props.scene.remove(this.line)
    this.line = null
  }
}

class ThreePolygons extends Component
{
  render = () =>
  {
    const {polygons, scene} = this.props

    if (polygons.length > 0)
      return <polygons>{polygons.map(({id, x, y, rotation, vertices}) => <ThreePolygon key={id} {...{x, y, rotation, vertices, scene}} />)}</polygons>

    return null
  }

  componentDidUpdate = ({renderScene}) => renderScene()
}

export default connect(({stage:{polygons}}) => ({polygons}))(ThreePolygons)
