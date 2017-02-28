import 'css/Libsteroids.css'
import {render} from 'inferno'
import {Provider} from 'inferno-redux'
import {store} from 'libsteroids-redux'
import Infernoroids from 'components/Infernoroids'

document.title = 'Infernoroids'

render(
  <Provider {...{store}}>
    <Infernoroids />
  </Provider>,
  document.body.appendChild(document.createElement('inferno'))
)

import {Event} from 'libsteroids-engine'
