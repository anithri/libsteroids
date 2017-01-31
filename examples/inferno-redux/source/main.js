import Inferno from 'inferno'
import {Provider} from 'inferno-redux'
import {store} from 'state/State'
import Libsteroids from 'ui/Libsteroids'

Inferno.render(
  <Provider {...{store}}>
    <Libsteroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
