import {connect} from 'react-redux'
import RendererSVGComponent from 'reacteroids-shared/components/RendererSVG'

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

const RendererSVG = connect(mapStateToProps)(RendererSVGComponent)

export default RendererSVG
