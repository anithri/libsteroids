import {inject, observer} from 'mobx-react'
import SoundsComponent from 'reacteroids-shared/components/Sounds'

function mapStateToProps({game: {events}})
{
  return {events}
}

const Sounds = inject(mapStateToProps)(observer(SoundsComponent))

export default Sounds
