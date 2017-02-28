import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Reacteroids from 'components/Reacteroids'
import {store} from 'libsteroids-redux'

document.title = 'Reacteroids Redux'

render(
  <Provider {...{store}}>
    <Reacteroids />
  </Provider>,
  document.body.appendChild(document.createElement('react'))
)
