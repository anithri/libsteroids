import {inject, observer} from 'mobx-react'
import {Screen} from 'constants'
import MainMenuComponent from 'reacteroids-shared/components/MainMenu'

function mapStateToProps({application, startGame})
{
  return {
    startGame,
    showHighScores: () => application.setScreen(Screen.HighScores)
 }
}

const MainMenu = inject(mapStateToProps)(observer(MainMenuComponent))

export default MainMenu
