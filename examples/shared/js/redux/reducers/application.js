import {Action} from '../actions/application'
import {Renderer, Screen} from '../../constants'

const initialState = {
  highScores: localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : [],
  renderer: Renderer.SVG,
  screen: Screen.MainMenu,
  username: ''
}

export default function reducer(state = initialState, action)
{
  switch (action.type)
  {
    case Action.SetHighScores:
      return {...state, highScores: [...action.highScores]}

    case Action.SetRenderer:
      return {...state, renderer: action.renderer}

    case Action.SetScreen:
      return {...state, screen: action.screen}

    case Action.SetUsername:
      return {...state, username: action.username}
  }

  return state
}
