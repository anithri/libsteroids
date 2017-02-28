import {Action} from '../actions/controls'

const initialState = {
  accelerating: false,
  hyperspace: false,
  rotatingLeft: false,
  rotatingRight: false,
  shooting: false
}

export default function reducer(state = initialState, action)
{
  switch (action.type)
  {
    case Action.SetAccelerating:
      return {...state, accelerating: action.accelerating}

    case Action.SetHyperspace:
      return {...state, hyperspace: action.hyperspace}

    case Action.SetRotatingLeft:
      return {...state, rotatingLeft: action.rotatingLeft}

    case Action.SetRotatingRight:
      return {...state, rotatingRight: action.rotatingRight}

    case Action.SetShooting:
      return {...state, shooting: action.shooting}
  }

  return state
}
