import {inject, observer} from 'mobx-react'
import RendererCanvasComponent from 'reacteroids-shared/components/RendererCanvas'

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

const RendererCanvas = inject(mapStateToProps)(observer(RendererCanvasComponent))

export default RendererCanvas
