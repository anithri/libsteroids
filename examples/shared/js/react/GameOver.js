import 'css/GameOver.css'
import React, {Component} from 'react'

const REQUEST_NAME_DELAY = 2000

export default class GameOver extends Component
{
  state = {
    requestName: false
  }

  render()
  {
    const {score, username} = this.props
    const {requestName} = this.state

    return (
      <div>
        <div className="score current-score">Score: {score}</div>
        <div className="centered-overlay game-over">
          {!requestName && <h1>GAME OVER</h1>}
          {requestName && (
            <form onSubmit={this.saveScore}>
              <h2>ENTER YOUR NAME</h2>
              <input ref={input => this.input = input} type="text" defaultValue={username} maxLength="10" autoFocus />
              <button>OK</button>
            </form>
          )}
        </div>
      </div>
    )
  }

  componentDidMount = () =>
  {
    setTimeout(() => this.setState({requestName:true}), REQUEST_NAME_DELAY)
  }

  saveScore = event =>
  {
    event.preventDefault()

    this.props.saveScore(this.input.value)
  }
}
