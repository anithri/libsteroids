export const RESIZE = 'RESIZE'

export const SET_PARTICLES = 'SET_PARTICLES'

export const SET_POLYGONS = 'SET_POLYGONS'

export const resize = () => ({type: RESIZE})

export const setParticles = particles => ({type: SET_PARTICLES, particles})

export const setPolygons = polygons => ({type: SET_POLYGONS, polygons})
