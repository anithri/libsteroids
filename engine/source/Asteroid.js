import * as Event from './Event'
import ExplosionParticle from './ExplosionParticle'
import {randomNumberBetween, rotatePoint} from './Math'

export const SIZES = [90, 45, 25, 12]
const MAXIMUM_VERTICES_COUNT = 10
const MINIMUM_VERTICES_COUNT = 6
const MAXIMUM_ROTATION_SPEED = 1
const MAXIMUM_SPEED = 2
const MAXIMUM_FRAGMENT_OFFSET = 20
const EXPLOSION_PARTICLE_COUNT = 30

let __index = 0

export default class Asteroid
{
  get hitArea()
  {
    if (!this._hitArea)
    {
      const {x, y, rotation, vertices} = this

      this._hitArea = vertices.map(vertex =>
      {
        const point = rotatePoint(vertex, {x:0, y:0}, rotation * Math.PI / 180)

        return {
          x: point.x + x,
          y: point.y + y
        }
      })
    }

    return this._hitArea
  }

  constructor(x, y, radius)
  {
    const verticesCount = randomNumberBetween(MINIMUM_VERTICES_COUNT, MAXIMUM_VERTICES_COUNT)
    const vertices = []

    // From http://codepen.io/bungu/pen/rawvJe
    while (vertices.length < verticesCount)
      vertices.push({
        x: (-Math.sin((360 / verticesCount) * vertices.length * Math.PI/180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * radius,
        y: (-Math.cos((360 / verticesCount) * vertices.length * Math.PI/180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * radius
      })

    Object.assign(this, {
      id: `asteroid_${__index++}`,
      x, y, radius, vertices,
      rotation: 0,
      rotationSpeed: randomNumberBetween(-MAXIMUM_ROTATION_SPEED, MAXIMUM_ROTATION_SPEED),
      velocity: {
        x: randomNumberBetween(-MAXIMUM_SPEED, MAXIMUM_SPEED),
        y: randomNumberBetween(-MAXIMUM_SPEED, MAXIMUM_SPEED)
      },
      destroyed: false,
      _hitArea: null
    })
  }

  update = (stageWidth, stageHeight) =>
  {
    const entities = new Set()
    let {x, y, radius, destroy} = this

    if (this.destroyed)
    {
      const sizeIndex = SIZES.indexOf(radius)

      while (entities.size < EXPLOSION_PARTICLE_COUNT)
        entities.add(new ExplosionParticle(x, y, radius))

      if (sizeIndex === 0)
        entities.add(Event.ExplosionLarge)

      else if ([1, 2].includes(sizeIndex))
        entities.add(Event.ExplosionMedium)

      else
        entities.add(Event.ExplosionSmall)

      if (sizeIndex < 3)
      {
        const fragmentSize = SIZES[sizeIndex + 1]
        let fragmentIndex = 0

        while (fragmentIndex++ < 2)
          entities.add(new Asteroid(
            randomNumberBetween(-MAXIMUM_FRAGMENT_OFFSET, MAXIMUM_FRAGMENT_OFFSET) + x,
            randomNumberBetween(-MAXIMUM_FRAGMENT_OFFSET, MAXIMUM_FRAGMENT_OFFSET) + y,
            fragmentSize
          ))
      }
    }

    else
    {
      let {rotation, rotationSpeed, velocity} = this

      x += velocity.x
      y += velocity.y

      if (x > stageWidth + radius)
        x = -radius

      else if (x < -radius)
        x = stageWidth + radius

      if (y > stageHeight + radius)
        y = -radius

      else if (y < -radius)
        y = stageHeight + radius

      rotation += rotationSpeed

      if (rotation >= 360)
        rotation -= 360

      if (rotation < 0)
        rotation += 360

      Object.assign(this, {x, y, rotation, _hitArea: null})
    }

    return entities
  }

  destroy = () => this.destroyed = true
}
