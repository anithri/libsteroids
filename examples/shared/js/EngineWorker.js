import {Engine} from 'libsteroids-engine'
import {truncate} from './Math'

function truncateParticleValues(particle)
{
  const {id, x, y, radius} = particle
  return {id, x: truncate(x, 2), y: truncate(y, 2), radius}
}

function truncatePolygonValues(polygon)
{
  const {id, x, y, rotation, vertices} = polygon
  return {id, x: truncate(x, 2), y: truncate(y, 2), rotation: truncate(rotation), vertices: vertices.map(({x, y}) => ({x:truncate(x), y:truncate(y)}))}
}

function handleMessage(message)
{
  const data = JSON.parse(message.data)

  switch (data.action)
  {
    case 'startGame':
      return engine.requestGameStart()

    case 'update':
      const entities = engine.update(data)
      const events = []
      const particles = []
      const polygons = []
      const response = {}

      entities.forEach((entity, key) =>
      {
        switch (key)
        {
          case 'events':
            entity.forEach(({type}) => events.push(type))
            break

          case 'explosionParticles':
          case 'saucerBullets':
          case 'shipBullets':
          case 'thrustParticles':
            entity.forEach(particle => particles.push(truncateParticleValues(particle)))
            break

          case 'asteroids':
          case 'remainingShips':
            entity.forEach(polygon => polygons.push(truncatePolygonValues(polygon)))
            break

          case 'saucer':
          case 'ship':
            polygons.push(Object.assign(truncatePolygonValues(entity), {id:key}))
            break

          case 'level':
            if (level !== entity)
              level = response.level = entity
            break

          case 'score':
            if (score !== entity)
              score = response.score = entity
            break
         }
      })

      if (events.length > 0)
        response.events = events

      if (particles.length > 0)
        response.particles = particles

      if (polygons.length > 0)
        response.polygons = polygons

      return postMessage(JSON.stringify(response))
  }
}

const engine = new Engine()
let level, score

onmessage = handleMessage
