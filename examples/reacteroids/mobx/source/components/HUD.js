import {inject, observer} from 'mobx-react'
import HUDComponent from 'reacteroids-shared/components/HUD'

function mapStateToProps({application: {renderer, highScores}, game: {level, score}})
{
  return {level, renderer, score, topScore: highScores.length > 0 ? highScores[0].score : 0}
}

const HUD = inject(mapStateToProps)(observer(HUDComponent))

export default HUD
