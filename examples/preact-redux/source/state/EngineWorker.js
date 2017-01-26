import Engine from 'engine/Engine'

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

      entities.forEach((entity, key) =>
      {
        switch (key)
        {
          case 'asteroids':
          case 'remainingShips':
            message.set(key, [...entity].map(({id, x, y, rotation, vertices}) => ({id, x, y, rotation, vertices})))
            break

          case 'events':
            message.set(key, [...entity].map(({type}) => type))
            break

          case 'explosionParticles':
          case 'saucerBullets':
          case 'shipBullets':
          case 'thrustParticles':
            message.set(key, [...entity].map(({id, x, y, radius}) => ({id, x, y, radius})))
            break

          case 'saucer':
          case 'ship':
            message.set(key, {id: key, x: entity.x, y: entity.y, rotation: entity.rotation, vertices: entity.vertices})
            break

          default:
            message.set(key, entity)
        }
      })

      return postMessage(message)
  }
}
