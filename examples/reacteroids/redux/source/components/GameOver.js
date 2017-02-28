import {connect} from 'react-redux'
import GameOverComponent from 'reacteroids-shared/components/GameOver'

function mapStateToProps({application:{username}, game:{score}, saveScore})
{
  return {saveScore, score, username}
}

const GameOver = connect(mapStateToProps)(GameOverComponent)

export default GameOver
