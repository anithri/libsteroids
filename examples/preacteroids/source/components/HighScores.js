/* @jsx h */
import 'css/HighScores.css'
import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import {Screen} from 'constants'
import {setScreen} from 'libsteroids-redux/actions'

class HighScores extends Component
{
  render({highScores, showMainMenu})
  {
    const numbers = []
    const names = []
    const scores = []
    let number = 0

    while (number++ < 10)
    {
      numbers.push(`${number}.`)

      if (number < 10)
        numbers.push(<br />)
    }

    highScores.forEach((highScore, index) =>
    {
      names.push(highScore.username)

      if (index < 9)
        names.push(<br />)

      scores.push(highScore.score)

      if (index < 9)
        scores.push(<br />)
    })

    return (
      <high-scores class="centered">
        <numbers>
          <h2>&nbsp;</h2>
          {numbers}
        </numbers>
        <names>
          <h2>NAME</h2>
          {names}
        </names>
        <scores>
          <h2>SCORE</h2>
          {scores}
        </scores>
        <button ref={button => this.button = button} onClick={showMainMenu}>MAIN MENU</button>
      </high-scores>
    )
  }

  componentDidMount()
  {
    this.button.focus()
  }
}

function mapStateToProps({application:{highScores}})
{
  return {highScores}
}

function mapDispatchToProps(dispatch)
{
  return {
    showMainMenu: () => dispatch(setScreen(Screen.MainMenu))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HighScores)
