import {inject, observer} from 'mobx-react'
import {Screen} from 'constants'
import HighScoresComponent from 'reacteroids-shared/components/HighScores'

function mapStateToProps({application})
{
  return {
    highScores: application.highScores,
    showMainMenu: () => application.setScreen(Screen.MainMenu)
  }
}

const HighScores = inject(mapStateToProps)(observer(HighScoresComponent))

export default HighScores
