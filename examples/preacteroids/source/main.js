/* @jsx h */
import 'css/Libsteroids.css'
import {render, h, options} from 'preact'
import {Provider} from 'preact-redux'
import {store} from 'libsteroids-redux'
import Preacteroids from 'components/Preacteroids'

document.title = 'Preacteroids'

options.debounceRendering = requestAnimationFrame

render(
  <Provider {...{store}}>
    <Preacteroids />
  </Provider>,
  document.body
)
