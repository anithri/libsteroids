import React from 'react'
import {inject, observer} from 'mobx-react'

const SVGParticle = ({x, y, radius}) => <circle cx={x} cy={y} r={radius} fill="white" />

const SVGParticles =({particles}) =>
{
  if (particles.length > 0)
    return <g>{particles.length > 0 && particles.map(({id, x, y, radius}) => <SVGParticle {...{key:id, x, y, radius}} />)}</g>

  return null
}

export default inject(({stage:{particles}}) => ({particles}))(observer(SVGParticles))
