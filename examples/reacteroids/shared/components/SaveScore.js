import 'css/SaveScore.css'
import React, {Component} from 'react'

export default class SaveScore extends Component
{
  render()
  {
    const {score, username} = this.props

    return (
      <save-score>
        <score>Score: {score}</score>
        <form className="centered" onSubmit={this.handleSubmit}>
          <h2>ENTER YOUR NAME</h2>
          <input ref={input => this.input = input} autoFocus type="text" defaultValue={username} maxLength="10" />
          <button>OK</button>
        </form>
      </save-score>
    )
  }

  handleSubmit = event =>
  {
    event.preventDefault()

    this.props.saveScore(this.input.value)
  }
}
