import {connect} from 'react-redux'
import RendererThreeComponent from 'reacteroids-shared/components/RendererThree'

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

const RendererThree = connect(mapStateToProps)(RendererThreeComponent)

export default RendererThree
