import 'css/MainMenu.css'
import Component from 'inferno-component'
import {connect} from 'inferno-redux'
import {Screen} from 'constants'
import {startGame} from 'libsteroids-redux'
import {setScreen} from 'libsteroids-redux/actions'

class MainMenu extends Component
{
  render({showHighScores})
  {
    return (
      <main-menu class="centered">
        <h1>INFERNOROIDS</h1>
        <button ref={startButton => this.startButton = startButton} onClick={startGame}>PLAY GAME</button>
        <button onClick={showHighScores}>HIGH SCORES</button>
      </main-menu>
    )
  }

  componentDidMount()
  {
    this.startButton.focus()
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    showHighScores: () => dispatch(setScreen(Screen.HighScores))
  }
}

export default connect(null, mapDispatchToProps)(MainMenu)
