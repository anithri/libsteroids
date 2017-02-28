import {connect} from 'react-redux'
import RendererPixiComponent from 'reacteroids-shared/components/RendererPixi'

function mapStateToProps({application:{renderer}, stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons, renderer}
}

const RendererPixi = connect(mapStateToProps)(RendererPixiComponent)

export default RendererPixi
