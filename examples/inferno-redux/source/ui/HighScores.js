import 'ui/HighScores.css'
import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'inferno-redux'
import {bindActionCreators} from 'redux'
import {showMainMenu} from 'state/Application'

class HighScores extends Component
{
  render = ({highScores, showMainMenu}) =>
  {
    const numbers = []
    const names = []
    const scores = []
    let number = 1

    do numbers.push(number)
    while (number++ < 10)

    highScores.forEach(item =>
    {
      names.push(item.username)
      scores.push(item.score)
    })

    return (
      <div className="centered-overlay scores">
        <div className="column numbers">
          <h3>&nbsp;</h3>
          {numbers.map(number => <div key={'number_' + number} className="column-item">{number}.</div>)}
        </div>
        <div className="column names">
          <h3>NAME</h3>
          {names.map((name, index) => <div key={'name_' + index} className="column-item">{name}</div>)}
        </div>
        <div className="column">
          <h3>SCORE</h3>
          {scores.map((score, index) => <div key={'score_' + index} className="column-item">{score}</div>)}
        </div>
        <button ref={button => this.button = button} onClick={showMainMenu}>MAIN MENU</button>
      </div>
    )
  }

  componentDidMount = () => this.button.focus()
}

export default connect(({application:{highScores}}) => ({highScores}), dispatch => bindActionCreators({showMainMenu}, dispatch))(HighScores)