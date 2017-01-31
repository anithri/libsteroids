/* @jsx h */
import {h, options, render} from 'preact'
import {Provider} from 'preact-redux'
import {store} from 'state/State'
import Libsteroids from 'ui/Libsteroids'

render(
  <Provider {...{store}}>
    <Libsteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
