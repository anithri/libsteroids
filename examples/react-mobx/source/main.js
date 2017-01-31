import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import Libsteroids from 'ui/Libsteroids'
import {application, game, stage, startGame, saveScore, showHighScores, showMainMenu} from 'state/State'

render(
  <Provider {...{application, game, stage, startGame, saveScore, showHighScores, showMainMenu}}>
    <Libsteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
