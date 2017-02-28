import {compose} from '@ngrx/core/compose'
import {Action, combineReducers} from '@ngrx/store'
import {storeFreeze} from 'ngrx-store-freeze'
import {State} from 'interfaces'
import * as application from 'reducers/application'
import * as controls from 'reducers/controls'
import * as game from 'reducers/game'
import * as stage from 'reducers/stage'

const reducers = {
  application: application.reducer,
  controls: controls.reducer,
  game: game.reducer,
  stage: stage.reducer
}

let reducerFunction:Function

if (DEVELOPMENT)
  reducerFunction = compose(storeFreeze, combineReducers)(reducers)

else
  reducerFunction = combineReducers(reducers)

export function reducer(state:State, action:Action):State
{
  return reducerFunction(state, action)
}
