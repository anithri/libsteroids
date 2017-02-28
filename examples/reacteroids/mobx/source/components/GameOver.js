import {inject, observer} from 'mobx-react'
import GameOverComponent from 'reacteroids-shared/components/GameOver'

function mapStateToProps({application:{username}, game:{score}, saveScore})
{
  return {saveScore, score, username}
}

const GameOver = inject(mapStateToProps)(observer(GameOverComponent))

export default GameOver
