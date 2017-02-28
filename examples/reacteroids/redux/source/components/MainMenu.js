import {connect} from 'react-redux'
import {Screen} from 'constants'
import {setScreen} from 'libsteroids-redux/actions'
import MainMenuComponent from 'reacteroids-shared/components/MainMenu'

function mapDispatchToProps(dispatch)
{
  return {
    showHighScores: () => dispatch(setScreen(Screen.HighScores))
  }
}

const MainMenu = connect(null, mapDispatchToProps)(MainMenuComponent)

export default MainMenu
