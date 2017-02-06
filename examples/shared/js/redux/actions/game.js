export const SET_EVENTS = 'SET_EVENTS'

export const SET_LEVEL = 'SET_LEVEL'

export const SET_SCORE = 'SET_SCORE'

export const SET_SHIP_COUNT = 'SET_SHIP_COUNT'

export const setEvents = events => ({type: SET_EVENTS, events})

export const setLevel = level => ({type: SET_LEVEL, level})

export const setScore = score => ({type: SET_SCORE, score})

export const setShipCount = shipCount => ({type: SET_SHIP_COUNT, shipCount})
