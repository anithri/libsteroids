import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import {application, controls, game, stage, startGame, saveScore} from 'state'
import Reacteroids from 'components/Reacteroids'

document.title = 'Reacteroids MobX'

render(
  <Provider {...{application, controls, game, stage, startGame, saveScore}}>
    <Reacteroids />
  </Provider>,
  document.body.appendChild(document.createElement('react'))
)
