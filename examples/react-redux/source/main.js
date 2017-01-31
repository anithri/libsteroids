import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {store} from 'state/State'
import Libsteroids from 'ui/Libsteroids'

render(
  <Provider {...{store}}>
    <Libsteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
