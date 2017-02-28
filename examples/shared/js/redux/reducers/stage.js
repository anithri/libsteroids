import {Action} from '../actions/stage'

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  particles: [],
  polygons: []
}

export default function reducer(state = initialState, action)
{
  switch (action.type)
  {
    case Action.Resize:
      return {...state, width: window.innerWidth, height: window.innerHeight}

    case Action.SetParticles:
      return {...state, particles: [...action.particles]}

    case Action.SetPolygons:
      return {...state, polygons: [...action.polygons]}
  }

  return state
}
