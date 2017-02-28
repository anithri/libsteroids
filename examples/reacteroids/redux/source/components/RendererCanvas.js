import {connect} from 'react-redux'
import RendererCanvasComponent from 'reacteroids-shared/components/RendererCanvas'

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

const RendererCanvas = connect(mapStateToProps)(RendererCanvasComponent)

export default RendererCanvas
