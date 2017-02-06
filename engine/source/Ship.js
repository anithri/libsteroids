import Event, {EXPLOSION_LARGE, SHIP_SPAWN, SHIP_THRUST_START, SHIP_THRUST_STOP, SHOT} from './Event'
import ExplosionParticle from './ExplosionParticle'
import ShipBullet from './ShipBullet'
import ThrustParticle from './ThrustParticle'
import {randomNumberBetween, rotatePoint} from './Math'

const WIDTH = 25
const HEIGHT = 40
const INDENT = 5
export const VERTICES = [
  {x:0, y:HEIGHT / 2},
  {x:-WIDTH / 2, y:-HEIGHT / 2},
  {x:(-WIDTH / 2) + INDENT, y:(-HEIGHT / 2) + INDENT},
  {x:(WIDTH / 2) - INDENT, y:(-HEIGHT / 2) + INDENT},
  {x:WIDTH / 2, y:-HEIGHT / 2},
]
const ACCELERATION = 0.25
const INERTIA = 0.99
const ROTATION_SPEED = 8
const SPAWN_DURATION = 2000
const SPAWN_BLINK_TOGGLE_DURATION = 200
const SHOT_DELAY = 250
const EXPLOSION_PARTICLE_COUNT = 30
const EXPLOSION_RADIUS = 50

export default class Ship
{
  vertices = VERTICES

  get hitArea()
  {
    if (!this._hitArea)
    {
      const {x, y, rotation} = this

      this._hitArea = VERTICES.map(vertex =>
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

  _spawn = false

  spawn = () => this._spawn = true

  update = (controls, stageWidth, stageHeight) =>
  {
    const entities = new Set()
    const now = Date.now()
    let {x, y, rotation} = this

    if (this._spawn)
    {
      Object.assign(this, {
        x: stageWidth / 2,
        y: stageHeight / 2,
        rotation: 180,
        velocity: {x:0, y:0},
        accelerating: false,
        spawning: true,
        visible: true,
        destroyed: false,
        _spawn: false,
        _hitArea: null,
        _spawnedAt: now,
        _spawnBlinkToggleAt: now,
        _lastShotAt: 0
      })

      entities.add(new Event(SHIP_SPAWN))
    }

    else if (this.destroyed)
    {
      while (entities.size < EXPLOSION_PARTICLE_COUNT)
        entities.add(new ExplosionParticle(x, y, EXPLOSION_RADIUS))

      entities.add(new Event(EXPLOSION_LARGE))

      this._spawn = true
    }

    else
    {
      const {accelerating, hyperspace, shooting} = controls
      const {velocity} = this

      if (this.spawning)
      {
        if (now > this._spawnedAt + SPAWN_DURATION)
        {
          this.spawning = false
          this.visible = true
        }

        else if (now > this._spawnBlinkToggleAt + SPAWN_BLINK_TOGGLE_DURATION)
        {
          this.visible = !this.visible
          this._spawnBlinkToggleAt = now
        }
      }

      if (hyperspace)
      {
        x = randomNumberBetween(0, stageWidth)
        y = randomNumberBetween(0, stageHeight)
        Object.assign(velocity, {x:0, y:0})
      }

      else
      {
        const {rotatingLeft, rotatingRight} = controls

        if (rotatingRight)
          rotation += ROTATION_SPEED

        if (rotatingLeft)
          rotation -= ROTATION_SPEED

        if (rotation >= 360)
          rotation -= 360

        else if (rotation < 0)
          rotation += 360

        if (accelerating)
        {
          if (!this.accelerating)
            entities.add(new Event(SHIP_THRUST_START))

          if (this.spawning)
          {
            this.spawning = false
            this.visible = true
          }

          velocity.x += Math.sin(-rotation * Math.PI/180) * ACCELERATION
          velocity.y += Math.cos(-rotation * Math.PI/180) * ACCELERATION
        }

        else if (this.accelerating)
          entities.add(new Event(SHIP_THRUST_STOP))

        x += velocity.x
        y += velocity.y

        if (x > stageWidth)
          x = 0

        else if (x < 0)
          x = stageWidth

        if (y > stageHeight)
          y = 0

        else if (y < 0)
          y = stageHeight

        velocity.x *= INERTIA
        velocity.y *= INERTIA

        if (Math.abs(velocity.x) < 0.1
        && Math.abs(velocity.y) < 0.1)
        {
          velocity.x = 0
          velocity.y = 0
        }
      }

      Object.assign(this, {x, y, rotation, accelerating, _hitArea: null})

      if (accelerating)
        entities.add(new ThrustParticle(this))

      if (shooting
      && now > this._lastShotAt + SHOT_DELAY)
      {
        this._lastShotAt = now

        entities.add(new Event(SHOT))
        entities.add(new ShipBullet(this, stageWidth, stageHeight))
      }
    }

    return entities
  }

  destroy = () => this.destroyed = true
}
