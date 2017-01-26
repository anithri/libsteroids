import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Reacteroids from 'ui/Reacteroids'
import {store} from 'state/State'

render(
  <Provider {...{store}}>
    <Reacteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)

if (DEVELOPMENT)
  io('http://localhost:3000').on('webpack', () => location.reload())
