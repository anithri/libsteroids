import {connect} from 'react-redux'
import {Screen} from 'constants'
import {setScreen} from 'libsteroids-redux/actions'
import HighScoresComponent from 'reacteroids-shared/components/HighScores'

function mapStateToProps({application:{highScores}})
{
  return {highScores}
}

function mapDispatchToProps(dispatch)
{
  return {
    showMainMenu: () => dispatch(setScreen(Screen.MainMenu))
  }
}

const HighScores = connect(mapStateToProps, mapDispatchToProps)(HighScoresComponent)

export default HighScores
