import React from 'react'
import {connect} from 'react-redux'
import SVGParticles from 'ui/SVGParticles'
import SVGPolygons from 'ui/SVGPolygons'

const SVGRenderer =({width, height}) => (
  <svg {...{width, height}}>
    <SVGParticles />
    <SVGPolygons />
  </svg>
)

export default connect(({stage:{width, height}}) => ({width, height}))(SVGRenderer)
