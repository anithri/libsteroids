import {randomNumberBetween, rotatePoint} from './Math'

const SHIP_OFFSET_Y = -20
const MAXIMUM_SPLATTER_DISTANCE = 2
const MINIMUM_RADIUS = 1
const MAXIMUM_RADIUS = 3
const MINIMUM_LIFESPAN = 20
const MAXIMUM_LIFESPAN = 40
const MINIMUM_SPEED = 3
const MAXIMUM_SPEED = 5
const INERTIA = 0.98
let __index = 0

export default class ThrustParticle
{
  constructor(ship)
  {
    const offset = rotatePoint({x:0, y:SHIP_OFFSET_Y}, {x:0, y:0}, ship.rotation * Math.PI / 180)

    Object.assign(this, {
      id: `thrust-particle_${__index++}`,
      x: ship.x + offset.x + randomNumberBetween(-MAXIMUM_SPLATTER_DISTANCE, MAXIMUM_SPLATTER_DISTANCE),
      y: ship.y + offset.y + randomNumberBetween(-MAXIMUM_SPLATTER_DISTANCE, MAXIMUM_SPLATTER_DISTANCE),
      radius: randomNumberBetween(MINIMUM_RADIUS, MAXIMUM_RADIUS),
      lifespan: randomNumberBetween(MINIMUM_LIFESPAN, MAXIMUM_LIFESPAN),
      velocity: {
        x: offset.x / randomNumberBetween(MINIMUM_SPEED, MAXIMUM_SPEED),
        y: offset.y / randomNumberBetween(MINIMUM_SPEED, MAXIMUM_SPEED)
      }
    })
  }

  update = () =>
  {
    this.radius -= 0.1

    if (this.radius < 0.1)
      this.radius = 0.1

    this.x += this.velocity.x
    this.y += this.velocity.y
    this.velocity.x *= INERTIA
    this.velocity.y *= INERTIA

    return --this.lifespan > 0
  }
}
