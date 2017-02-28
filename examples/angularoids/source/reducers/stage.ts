import {Action, ActionType} from 'actions/stage'
import {Particle, Polygon, StageState} from 'interfaces'

const width:number = window.innerWidth
const height:number = window.innerHeight
const particles:Particle[] = []
const polygons:Polygon[] = []
const initialState:StageState = {width, height, particles, polygons}

export function reducer(state:StageState = initialState, action:Action):StageState
{
  if (ActionType[action.type])
    switch (action.type)
    {
      case ActionType.Resize:
        return {...state, width: window.innerWidth, height: window.innerHeight}

      case ActionType.SetParticles:
        return {...state, particles: [...action.particles]}

      case ActionType.SetPolygons:
        return {...state, polygons: [...action.polygons]}
    }

  return state
}
