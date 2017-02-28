/* @jsx h */
import 'css/GameOver.css'
import {h} from 'preact'
import {connect} from 'preact-redux'

const GameOver = ({score}) => (
  <game-over>
    <score>Score: {score}</score>
    <h1 class="centered">GAME OVER</h1>
  </game-over>
)

function mapStateToProps({game:{score}})
{
  return {score}
}

export default connect(mapStateToProps)(GameOver)
