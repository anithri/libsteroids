/* @jsx h */
import {h, options, render} from 'preact'
import {Provider} from 'preact-redux'
import Preacteroids from 'ui/Preacteroids'
import {store} from 'state/State'

options.debounceRendering = requestAnimationFrame

render(
  <Provider {...{store}}>
    <Preacteroids />
  </Provider>,
  document.body
)

if (DEVELOPMENT)
  io('http://localhost:3000').on('webpack', () => location.reload())
