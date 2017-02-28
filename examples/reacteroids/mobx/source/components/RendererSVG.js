import {inject, observer} from 'mobx-react'
import RendererSVGComponent from 'reacteroids-shared/components/RendererSVG'

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

const RendererSVG = inject(mapStateToProps)(observer(RendererSVGComponent))

export default RendererSVG
