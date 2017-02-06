import Engine from 'libsteroids-engine'

const round = (value, places = 0) =>
{
  const multiplier = Math.pow(10, places)
  return (Math.round(value * multiplier) / multiplier)
}

const engine = new Engine()

self.onmessage = ({data}) =>
{
  switch (data.action)
  {
    case 'startGame':
      return engine.requestGameStart()

    case 'update':
      const entities = engine.update(data)
      const message = new Map()
      let particles = []
      let polygons = []

      entities.forEach((entity, key) =>
      {
        switch (key)
        {
          case 'asteroids':
            polygons = [...polygons, ...entity]
            break

          case 'remainingShips':
            polygons = [...polygons, ...entity]
            message.set('shipCount', entity.size)
            break

          case 'events':
            message.set('events', [...entity].map(({type}) => type))
            break

          case 'explosionParticles':
          case 'saucerBullets':
          case 'shipBullets':
          case 'thrustParticles':
            particles = [...particles, ...entity]
            break

          case 'saucer':
          case 'ship':
            polygons.push({...entity, id:key})
            break

          default:
            message.set(key, entity)
        }
      })

      if (particles.length > 0)
        message.set('particles', particles.map(({id, x, y, radius}) => ({id, x: round(x, 2), y: round(y, 2), radius})))

      if (polygons.length > 0)
        message.set('polygons', polygons.map(({id, x, y, rotation, vertices}) => ({id, x: round(x, 2), y: round(y, 2), rotation: round(rotation), vertices: vertices.map(({x, y}) => ({x: round(x), y: round(y)}))})))

      return postMessage(message)
  }
}
