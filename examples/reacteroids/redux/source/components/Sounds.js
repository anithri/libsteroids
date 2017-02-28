import {connect} from 'react-redux'
import SoundsComponent from 'reacteroids-shared/components/Sounds'

function mapStateToProps({game: {events}})
{
  return {events}
}

const Sounds = connect(mapStateToProps)(SoundsComponent)

export default Sounds
