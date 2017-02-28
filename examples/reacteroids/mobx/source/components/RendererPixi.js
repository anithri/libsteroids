import {inject, observer} from 'mobx-react'
import RendererPixiComponent from 'reacteroids-shared/components/RendererPixi'

function mapStateToProps({application:{renderer}, stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons, renderer}
}

const RendererPixi = inject(mapStateToProps)(observer(RendererPixiComponent))

export default RendererPixi
