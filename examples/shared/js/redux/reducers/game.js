import {SET_EVENTS, SET_LEVEL, SET_SCORE, SET_SHIP_COUNT} from 'state/actions/game'

const initialState = {
  events: [],
  level: 1,
  score: 0,
  shipCount: 0
}

export default (state = initialState, action) =>
{
  switch (action.type)
  {
    case SET_EVENTS:
      return {...state, events: [...action.events]}

    case SET_LEVEL:
      return {...state, level: action.level}

    case SET_SCORE:
      return {...state, score: action.score}

    case SET_SHIP_COUNT:
      return {...state, shipCount: action.shipCount}

    default:
      return state
  }
}
