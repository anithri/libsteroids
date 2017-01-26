const ACTION = {
  SET_EVENTS: 'SET_EVENTS',
  SET_LEVEL: 'SET_LEVEL',
  SET_SCORE: 'SET_SCORE',
  SET_SHIP_COUNT: 'SET_SHIP_COUNT',
}

const initialState = {
  events: [],
  level: 1,
  score: 0,
  shipCount: 0
}

const reducer = (state = initialState, action) =>
{
  switch (action.type)
  {
    case ACTION.SET_EVENTS:
      return {...state, events: [...action.events]}

    case ACTION.SET_LEVEL:
      return {...state, level: action.level}

    case ACTION.SET_SCORE:
      return {...state, score: action.score}

    case ACTION.SET_SHIP_COUNT:
      return {...state, shipCount: action.shipCount}

    default:
      return state
  }
}

const setEvents = events => ({type: ACTION.SET_EVENTS, events})

const setLevel = level => ({type: ACTION.SET_LEVEL, level})

const setScore = score => ({type: ACTION.SET_SCORE, score})

const setShipCount = shipCount => ({type: ACTION.SET_SHIP_COUNT, shipCount})

export {setEvents, setLevel, setScore, setShipCount, reducer}
