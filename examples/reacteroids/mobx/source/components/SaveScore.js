import {inject, observer} from 'mobx-react'
import SaveScoreComponent from 'reacteroids-shared/components/SaveScore'

function mapStateToProps({application:{username}, game:{score}, saveScore})
{
  return {saveScore, score, username}
}

const SaveScore = inject(mapStateToProps)(observer(SaveScoreComponent))

export default SaveScore
