import 'ui/GameOver.css'
import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import {saveScore} from 'state/State'

const REQUEST_NAME_DELAY = 2000

class GameOver extends Component
{
  state = {
    requestName: false
  }

  render = () =>
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

  componentDidMount = () => setTimeout(() => this.setState({requestName:true}), REQUEST_NAME_DELAY)

  saveScore = event =>
  {
    event.preventDefault()

    saveScore(this.input.value)
  }
}

export default connect(({application:{username}, game:{score}}) => ({score, username}))(GameOver)
