/* @jsx h */
import 'css/GameOver.css'
import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import {saveScore} from 'state'

const REQUEST_NAME_DELAY = 2000

class GameOver extends Component
{
  state = {
    requestName: false
  }

  render = ({score, username}, {requestName}) => (
    <div>
      <div class="score current-score">Score: {score}</div>
      <div class="centered-overlay game-over">
        {!requestName && <h1>GAME OVER</h1>}
        {requestName && (
          <form onSubmit={this.saveScore}>
            <h2>ENTER YOUR NAME</h2>
            <input ref={input => this.input = input} type="text" value={username} maxLength="10" />
            <button>OK</button>
          </form>
        )}
      </div>
    </div>
  )

  componentDidMount = () => setTimeout(() => this.setState({requestName:true}), REQUEST_NAME_DELAY)

  componentDidUpdate = () => this.input.focus()

  saveScore = event =>
  {
    event.preventDefault()

    saveScore(this.input.value)
  }
}

export default connect(({application:{username}, game:{score}}) => ({score, username}))(GameOver)
