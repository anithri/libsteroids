import {Action, ActionType} from 'actions/game'
import {GameState} from 'interfaces'

const events:string[] = []
const level:number = 0
const score:number = 0
const initialState:GameState = {events, level, score}

export function reducer(state:GameState = initialState, action:Action):GameState
{
  switch (action.type)
  {
    case ActionType.SetEvents:
      return {...state, events: [...action.events]}

    case ActionType.SetLevel:
      return {...state, level: action.level}

    case ActionType.SetScore:
      return {...state, score: action.score}

    default:
      return state
  }
}
