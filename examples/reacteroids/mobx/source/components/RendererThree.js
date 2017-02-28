import {inject, observer} from 'mobx-react'
import RendererThreeComponent from 'reacteroids-shared/components/RendererThree'

function mapStateToProps({stage:{width, height, particles, polygons}})
{
  return {width, height, particles, polygons}
}

const RendererThree = inject(mapStateToProps)(observer(RendererThreeComponent))

export default RendererThree
