import React from 'react'
import {inject, observer} from 'mobx-react'
import SVGParticles from 'ui/SVGParticles'
import SVGPolygons from 'ui/SVGPolygons'

const SVGRenderer =({width, height}) => (
  <svg {...{width, height}}>
    <SVGParticles />
    <SVGPolygons />
  </svg>
)

export default inject(({stage:{width, height}}) => ({width, height}))(observer(SVGRenderer))
