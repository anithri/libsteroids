import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import Reacteroids from 'ui/Reacteroids'
import {application, game, stage, startGame, saveScore, showHighScores, showMainMenu} from 'state/State'

render(
  <Provider {...{application, game, stage, startGame, saveScore, showHighScores, showMainMenu}}>
    <Reacteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)

if (DEVELOPMENT)
  io('http://localhost:3000').on('webpack', () => location.reload())
