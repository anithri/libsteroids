import {Action} from '../actions/game'

const initialState = {
  events: [],
  level: 1,
  score: 0
}

export default function reducer(state = initialState, action)
{
  switch (action.type)
  {
    case Action.SetEvents:
      return {...state, events: [...action.events]}

    case Action.SetLevel:
      return {...state, level: action.level}

    case Action.SetScore:
      return {...state, score: action.score}
  }

  return state
}
