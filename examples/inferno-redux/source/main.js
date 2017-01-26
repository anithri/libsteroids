import Inferno from 'inferno'
import {Provider} from 'inferno-redux'
import Infernoroids from 'ui/Infernoroids'
import {store} from 'state/State'

Inferno.render(
  <Provider {...{store}}>
    <Infernoroids />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)

if (DEVELOPMENT)
  io('http://localhost:3000').on('webpack', () => location.reload())
