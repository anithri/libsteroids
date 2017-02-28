export const Action = {
  Resize: 'Resize',
  SetParticles: 'SetParticles',
  SetPolygons: 'SetPolygons'
}

export function resize()
{
  return {type: Action.Resize}
}

export function setParticles(particles)
{
  return {type: Action.SetParticles, particles}
}

export function setPolygons(polygons)
{
  return {type: Action.SetPolygons, polygons}
}
