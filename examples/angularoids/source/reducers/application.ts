import {Action, ActionType, Renderer, Screen} from 'actions/application'
import {HighScore, ApplicationState} from 'interfaces'

const highScores:HighScore[] = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : []
const renderer:Renderer = Renderer.SVG
const screen:Screen = Screen.MainMenu
const username:string = ''
const initialState:ApplicationState = {highScores, renderer, screen, username}

export function reducer(state:ApplicationState = initialState, action:Action):ApplicationState
{
  switch (action.type)
  {
    case ActionType.SetHighScores:
      return {...state, highScores: [...action.highScores]}

    case ActionType.SetRenderer:
      return {...state, renderer: action.renderer}

    case ActionType.SetScreen:
      return {...state, screen: action.screen}

    case ActionType.SetUsername:
      return {...state, username: action.username}

    default:
      return state
  }
}
