import {randomNumberBetween} from './Math'

const MAXIMUM_RADIUS = 4
const MINIMUM_RADIUS = 1
const MAXIMUM_LIFESPAN = 100
const MINIMUM_LIFESPAN = 60
const MAXIMUM_SPEED = 1.5
const INERTIA = 0.98
let __index = 0

export default class ExplosionParticle
{
  constructor(explosionX, explosionY, explosionRadius)
  {
    Object.assign(this, {
      id: `explosion-particle_${__index++}`,
      x: explosionX + randomNumberBetween(-explosionRadius / 4, explosionRadius / 4),
      y: explosionY + randomNumberBetween(-explosionRadius / 4, explosionRadius / 4),
      radius: randomNumberBetween(MINIMUM_RADIUS, MAXIMUM_RADIUS),
      lifespan: randomNumberBetween(MINIMUM_LIFESPAN, MAXIMUM_LIFESPAN),
      velocity: {
        x: randomNumberBetween(-MAXIMUM_SPEED, MAXIMUM_SPEED),
        y: randomNumberBetween(-MAXIMUM_SPEED, MAXIMUM_SPEED)
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

    if (--this.lifespan <= 0)
      this.removed = true
  }
}
