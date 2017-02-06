/* @jsx h */
import 'css/MainMenu.css'
import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import {bindActionCreators} from 'redux'
import {startGame} from 'state'
import {showHighScores} from 'state/actions/application'

class MainMenu extends Component
{
  render = ({showHighScores}) => (
    <div class="centered-overlay menu">
      <h1>PREACTEROIDS</h1>
      <button ref={startButton => this.startButton = startButton} onClick={startGame}>PLAY GAME</button>
      <button onClick={showHighScores}>HIGH SCORES</button>
    </div>
  )

  componentDidMount = () => this.startButton.focus()
}

export default connect(null, dispatch => bindActionCreators({showHighScores}, dispatch))(MainMenu)
