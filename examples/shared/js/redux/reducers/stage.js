import {RESIZE, SET_PARTICLES, SET_POLYGONS} from 'state/actions/stage'

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  particles: [],
  polygons: []
}

export default (state = initialState, action) =>
{
  switch (action.type)
  {
    case RESIZE:
      return {...state, width: window.innerWidth, height: window.innerHeight}

    case SET_PARTICLES:
      return {...state, particles: [...action.particles]}

    case SET_POLYGONS:
      return {...state, polygons: [...action.polygons]}

    default:
      return state
  }
}
