const ACTION = {
  RESIZE: 'RESIZE',
  SET_PARTICLES: 'SET_PARTICLES',
  SET_POLYGONS: 'SET_POLYGONS'
}

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  particles: [],
  polygons: []
}

const reducer = (state = initialState, action) =>
{
  switch (action.type)
  {
    case ACTION.RESIZE:
      return {...state, width: window.innerWidth, height: window.innerHeight}

    case ACTION.SET_PARTICLES:
      return {...state, particles: [...action.particles]}

    case ACTION.SET_POLYGONS:
      return {...state, polygons: [...action.polygons]}

    default:
      return state
  }
}

const resize = () => ({type: ACTION.RESIZE})

const setParticles = particles => ({type: ACTION.SET_PARTICLES, particles})

const setPolygons = polygons => ({type: ACTION.SET_POLYGONS, polygons})

export {resize, setParticles, setPolygons, reducer}
