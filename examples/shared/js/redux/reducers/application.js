import {SET_HIGH_SCORES, SET_RENDERER, SET_SCREEN, SET_USERNAME} from 'state/actions/application'
import {RENDERER, SCREEN} from 'constants'

const initialState = {
  highScores: localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : [],
  renderer: RENDERER.SVG,
  screen: SCREEN.MAIN_MENU,
  username: ''
}

export default (state = initialState, action) =>
{
  switch (action.type)
  {
    case SET_HIGH_SCORES:
      return {...state, highScores: [...action.highScores]}

    case SET_RENDERER:
      return {...state, renderer: action.renderer}

    case SET_SCREEN:
      return {...state, screen: action.screen}

    case SET_USERNAME:
      return {...state, username: action.username}

    default:
      return state
  }
}
