/* @jsx h */
import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import {OrthographicCamera, Scene, WebGLRenderer} from 'three'
import ThreeParticles from 'ui/ThreeParticles'
import ThreePolygons from 'ui/ThreePolygons'

class ThreeRenderer extends Component
{
  componentWillMount = () =>
  {
    const {width, height} = this.props
    const renderer = new WebGLRenderer({antialias: true})
    const scene = new Scene()
    const camera = new OrthographicCamera(0, width, 0, height, 0, 1)

    Object.assign(this, {renderer, scene, camera})

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    document.body.insertBefore(renderer.domElement, document.body.lastChild)
  }

  renderScene = () => this.renderer.render(this.scene, this.camera)

  render = () =>
  {
    const {scene, renderScene} = this

    return (
      <scene hidden="true">
        <ThreeParticles {...{scene}} />
        <ThreePolygons {...{scene, renderScene}} />
      </scene>
    )
  }

  componentWillUnmount = () =>
  {
    document.body.removeChild(this.renderer.domElement)

    this.renderer = null
    this.scene = null
    this.camera = null
  }
}

export default connect(({stage:{width, height}}) => ({width, height}))(ThreeRenderer)
