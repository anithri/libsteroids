import Event, {EXPLOSION_LARGE, SAUCER_LARGE_SPAWN, SAUCER_SMALL_SPAWN, SAUCER_REMOVED, SHOT} from './Event'
import ExplosionParticle from './ExplosionParticle'
import SaucerBullet from './SaucerBullet'
import {randomNumberBetween, rotatePoint} from './Math'

const HIT_AREA_VERTICES = [
  {x:-40, y:0},
  {x:-15, y:-10},
  {x:-10, y:-25},
  {x:10, y:-25},
  {x:15, y:-10},
  {x:40, y:0},
  {x:15, y:15},
  {x:-15, y:15}
]
const VERTICES = HIT_AREA_VERTICES.concat([
  {x:-40, y:0},
  {x:-15, y:-10},
  {x:15, y:-10},
  {x:40, y:0}
])
const MAXIMUM_SPAWN_DELAY = 15000
const MINIMUM_SPAWN_DELAY = 5000
const MINIMUM_SPEED = 1
const MAXIMUM_SPEED = 2
const MINIMUM_VELOCITY_CHANGE_DURATION = 1000
const MAXIMUM_VELOCITY_CHANGE_DURATION = 3000
const SHOT_DELAY = 1000
const EXPLOSION_PARTICLE_COUNT = 30
const EXPLOSION_RADIUS = 50
const SMALL_SAUCER_SCALE = 0.7

export default class Saucer
{
  rotation = 0

  vertices = VERTICES

  get hitArea()
  {
    if (!this._hitArea)
    {
      const {x, y, rotation} = this

      this._hitArea = HIT_AREA_VERTICES.map(vertex =>
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

  update = (ship, stageWidth, stageHeight) =>
  {
    const entities = new Set()
    const now = Date.now()
    let {x, y, velocity} = this

    if (this.active)
    {
      if (this._destroyed
      || this._removed)
      {
        this.active = false

        if (this._destroyed)
        {
          while (entities.size < EXPLOSION_PARTICLE_COUNT)
            entities.add(new ExplosionParticle(x, y, EXPLOSION_RADIUS))

          entities.add(new Event(EXPLOSION_LARGE))
        }

        entities.add(new Event(SAUCER_REMOVED))
      }

      else
      {
        x += velocity.x
        y += velocity.y

        if (x < 0
        || x > stageWidth)
          this.remove()

        else
        {
          if (y < 0)
            y = stageHeight

          else if (y > stageHeight)
            y = 0

          Object.assign(this, {x, y, _hitArea: null})

          if (now > this._lastShotAt + SHOT_DELAY)
          {
            entities.add(new Event(SHOT))
            entities.add(new SaucerBullet(this, ship, stageWidth, stageHeight))

            this._lastShotAt = now
          }

          if (now > this._changeVelocityAt)
          {
            const speedX = randomNumberBetween(MINIMUM_SPEED, MAXIMUM_SPEED)
            const speedY = randomNumberBetween(MINIMUM_SPEED, MAXIMUM_SPEED)

            velocity.x = velocity.x > 0 ? speedX : -speedX
            velocity.y = velocity.y < 0 ? speedY : -speedY

            this._changeVelocityAt = now + randomNumberBetween(MINIMUM_VELOCITY_CHANGE_DURATION, MAXIMUM_VELOCITY_CHANGE_DURATION)
          }
        }
      }
    }

    else if (now >= this._spawnAt)
    {
      const speedX = randomNumberBetween(MINIMUM_SPEED, MAXIMUM_SPEED)
      const speedY = randomNumberBetween(MINIMUM_SPEED, MAXIMUM_SPEED)
      const x = Math.random() >= 0.5 ? 0 : stageWidth
      const scale = Math.random() >= 0.5 ? 1 : SMALL_SAUCER_SCALE

      Object.assign(this, {
        x,
        y: randomNumberBetween(0, stageHeight),
        scale,
        vertices: scale === 1 ? VERTICES : VERTICES.map(vertex => ({x:vertex.x * SMALL_SAUCER_SCALE, y:vertex.y * SMALL_SAUCER_SCALE})),
        velocity: {
          x: x === 0 ? speedX : -speedX,
          y: Math.random() >= 0.5 ? speedY : -speedY
        },
        active: true,
        _destroyed: false,
        _removed: false,
        _hitArea: null,
        _lastShotAt: 0,
        _changeVelocityAt: Date.now() + randomNumberBetween(MINIMUM_VELOCITY_CHANGE_DURATION, MAXIMUM_VELOCITY_CHANGE_DURATION)
      })

      entities.add(new Event(scale === 1 ? SAUCER_LARGE_SPAWN : SAUCER_SMALL_SPAWN))
    }

    return entities
  }

  reset = () => this._spawnAt = Date.now() + randomNumberBetween(MINIMUM_SPAWN_DELAY, MAXIMUM_SPAWN_DELAY)

  destroy = () =>
  {
    this._destroyed = true
    this.reset()
  }

  remove = () =>
  {
    this._removed = true
    this.reset()
  }
}
