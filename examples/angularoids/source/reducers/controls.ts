import {Action, ActionType} from 'actions/controls'
import {ControlsState} from 'interfaces'

const accelerating:boolean = false
const rotatingLeft:boolean = false
const rotatingRight:boolean = false
const shooting:boolean = false
const hyperspace:boolean = false
const initialState:ControlsState = {accelerating, rotatingLeft, rotatingRight, shooting, hyperspace}

export function reducer(state:ControlsState = initialState, action:Action):ControlsState
{
  switch (action.type)
  {
    case ActionType.SetAccelerating:
      return {...state, accelerating: action.accelerating}

    case ActionType.SetHyperspace:
      return {...state, hyperspace: action.hyperspace}

    case ActionType.SetRotatingLeft:
      return {...state, rotatingLeft: action.rotatingLeft}

    case ActionType.SetRotatingRight:
      return {...state, rotatingRight: action.rotatingRight}

    case ActionType.SetShooting:
      return {...state, shooting: action.shooting}

    default:
      return state
  }
}
