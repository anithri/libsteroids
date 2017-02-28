import 'css/SaveScore.css'
import Component from 'inferno-component'
import {connect} from 'inferno-redux'
import {saveScore} from 'libsteroids-redux'

class SaveScore extends Component
{
  render({score, username})
  {
    return (
      <save-score>
        <score>Score: {score}</score>
        <form class="centered" onSubmit={this.handleSubmit}>
          <h2>ENTER YOUR NAME</h2>
          <input ref={input => this.input = input} type="text" defaultValue={username} maxLength="10" />
          <button>OK</button>
        </form>
      </save-score>
    )
  }

  componentDidMount()
  {
    this.input.focus()
  }

  handleSubmit = event =>
  {
    event.preventDefault()

    saveScore(this.input.value)
  }
}

function mapStateToProps({application:{username}, game:{score}})
{
  return {score, username}
}

export default connect(mapStateToProps)(SaveScore)
