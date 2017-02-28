import {combineReducers} from 'redux'
import application from '../reducers/application'
import controls from '../reducers/controls'
import game from '../reducers/game'
import stage from '../reducers/stage'

export default combineReducers({application, controls, game, stage})
