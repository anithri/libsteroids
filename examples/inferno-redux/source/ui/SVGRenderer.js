import Inferno from 'inferno'
import {connect} from 'inferno-redux'
import SVGParticles from 'ui/SVGParticles'
import SVGPolygons from 'ui/SVGPolygons'

const SVGRenderer =({width, height}) => (
  <svg {...{width, height}}>
    <SVGParticles />
    <SVGPolygons />
  </svg>
)

export default connect(({stage:{width, height}}) => ({width, height}))(SVGRenderer)
