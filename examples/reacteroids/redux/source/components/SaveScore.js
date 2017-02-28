import {connect} from 'react-redux'
import {saveScore} from 'libsteroids-redux'
import SaveScoreComponent from 'reacteroids-shared/components/SaveScore'

function mapStateToProps({application:{username}, game:{score}})
{
  return {score, username}
}

const SaveScore = connect(mapStateToProps)(SaveScoreComponent)

export default SaveScore
