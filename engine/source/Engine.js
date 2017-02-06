import Asteroid, {SIZES as ASTEROID_SIZES} from './Asteroid'
import CollisionTests from './CollisionTests'
import Event, {GAME_START, GAME_END, NEW_LEVEL} from './Event'
import ExplosionParticle from './ExplosionParticle'
import Saucer from './Saucer'
import SaucerBullet from './SaucerBullet'
import Ship, {VERTICES as SHIP_VERTICES} from './Ship'
import ShipBullet from './ShipBullet'
import ThrustParticle from './ThrustParticle'
import {randomNumberBetween, randomNumberBetweenExcluding} from './Math'

const UPDATE_OPERATION = {
  INITIALIZE: 'INITIALIZE',
  UPDATE_ASTEROIDS: 'UPDATE_ASTEROIDS',
  START_GAME: 'START_GAME',
  UPDATE_GAME: 'UPDATE_GAME',
  END_GAME: 'END_GAME'
}
const INTRO_ASTEROID_COUNT = 10
const NEW_GAME_ASTEROID_COUNT = 3
const NEW_ASTEROID_SHIP_OFFSET = 80
const INITIAL_SHIPS_COUNT = 3
const REMAINING_SHIPS_POSITION = {x:35, y:95}
const REMAINING_SHIP_SCALE = 0.75
const REMAINING_SHIP_SPACING = 35

export default class Engine
{
  asteroids = new Set()

  explosionParticles = new Set()

  remainingShips = new Set()

  saucer = new Saucer()

  saucerBullets = new Set()

  ship = new Ship()

  shipBullets = new Set()

  thrustParticles = new Set()

  nextUpdateOperation = UPDATE_OPERATION.INITIALIZE

  update = data =>
  {
    switch (this.nextUpdateOperation)
    {
      case UPDATE_OPERATION.INITIALIZE:
        return this.initialize(data)

      case UPDATE_OPERATION.UPDATE_ASTEROIDS:
        return this.updateAsteroids(data)

      case UPDATE_OPERATION.START_GAME:
        return this.startGame(data)

      case UPDATE_OPERATION.UPDATE_GAME:
        return this.updateGame(data)

      case UPDATE_OPERATION.END_GAME:
        return this.endGame(data)
    }
  }

  initialize = ({stageWidth, stageHeight}) =>
  {
    const entities = new Map()
    let index = 0

    while (index++ < INTRO_ASTEROID_COUNT)
      this.asteroids.add(new Asteroid(
        randomNumberBetween(0, stageWidth),
        randomNumberBetween(0, stageHeight),
        randomNumberBetween(ASTEROID_SIZES[0], ASTEROID_SIZES[3])
      ))

    entities.set('asteroids', this.asteroids)

    this.nextUpdateOperation = UPDATE_OPERATION.UPDATE_ASTEROIDS

    return entities
  }

  updateAsteroids = ({stageWidth, stageHeight}) =>
  {
    const entities = new Map()

    this.asteroids.forEach(asteroid => asteroid.update(stageWidth, stageHeight))

    entities.set('asteroids', this.asteroids)

    return entities
  }

  startGame = ({stageWidth, stageHeight}) =>
  {
    const entities = new Map()

    Object.assign(this, {level: 1, score: 0})

    this.createNewLevelAsteroids(1, null, stageWidth, stageHeight)
    this.createRemainingShips()
    this.saucer.reset()
    this.ship.spawn()

    entities.set('asteroids', this.asteroids)
    entities.set('events', new Set([new Event(GAME_START)]))
    entities.set('remainingShips', this.remainingShips)
    entities.set('score', this.score)
    entities.set('ship', this.ship)

    this.nextUpdateOperation = UPDATE_OPERATION.UPDATE_GAME

    return entities
  }

  updateGame = ({controls, stageWidth, stageHeight}) =>
  {
    const {asteroids, explosionParticles, remainingShips, saucer, saucerBullets, ship, shipBullets, thrustParticles} = this
    const collisionTests = new CollisionTests(asteroids, saucer, saucerBullets, ship, shipBullets)
    const entitiesAdded = new Set()
    const entities = new Map()
    const events = new Set()
    const now = Date.now()

    if (collisionTests.points)
      this.score += collisionTests.points

    if (ship.destroyed)
    {
      remainingShips.delete([...remainingShips].pop())

      if (remainingShips.size > 0)
        ship.spawn()
    }

    asteroids.forEach(asteroid =>
    {
      asteroid.update(stageWidth, stageHeight).forEach(entity => entitiesAdded.add(entity))

      if (asteroid.destroyed)
        asteroids.delete(asteroid)
    })

    explosionParticles.forEach(explosionParticle =>
    {
      explosionParticle.update(stageWidth, stageHeight)

      if (explosionParticle.removed)
        explosionParticles.delete(explosionParticle)
    })

    saucer.update(ship, stageWidth, stageHeight).forEach(entity => entitiesAdded.add(entity))

    saucerBullets.forEach(saucerBullet =>
    {
      saucerBullet.update(stageWidth, stageHeight)

      if (saucerBullet.removed)
        saucerBullets.delete(saucerBullet)
    })

    ship.update(controls, stageWidth, stageHeight).forEach(entity => entitiesAdded.add(entity))

    shipBullets.forEach(shipBullet =>
    {
      shipBullet.update(stageWidth, stageHeight)

      if (shipBullet.removed)
        shipBullets.delete(shipBullet)
    })

    thrustParticles.forEach(thrustParticle =>
    {
      thrustParticle.update(stageWidth, stageHeight)

      if (thrustParticle.lifespan <= 0)
        thrustParticles.delete(thrustParticle)
    })

    entitiesAdded.forEach(entity =>
    {
      if (entity instanceof Asteroid)
        asteroids.add(entity)

      else if (entity instanceof Event)
        events.add(entity)

      else if (entity instanceof ExplosionParticle)
        explosionParticles.add(entity)

      else if (entity instanceof SaucerBullet)
        saucerBullets.add(entity)

      else if (entity instanceof ShipBullet)
        shipBullets.add(entity)

      else if (entity instanceof ThrustParticle)
        thrustParticles.add(entity)
    })

    if (remainingShips.size > 0)
    {
      if (asteroids.size === 0)
      {
        this.level++

        this.createNewLevelAsteroids(this.level, ship, stageWidth, stageHeight)

        events.add(new Event(NEW_LEVEL))
      }

      entities.set('remainingShips', remainingShips)

      if (saucer.active)
        entities.set('saucer', saucer)

      if (saucerBullets.size > 0)
        entities.set('saucerBullets', saucerBullets)

      if (ship.visible)
        entities.set('ship', ship)

      if (shipBullets.size > 0)
        entities.set('shipBullets', shipBullets)

      if (thrustParticles.size > 0)
        entities.set('thrustParticles', thrustParticles)
    }

    else
      this.nextUpdateOperation = UPDATE_OPERATION.END_GAME

    if (asteroids.size > 0)
      entities.set('asteroids', asteroids)

    if (events.size > 0)
      entities.set('events', events)

    if (this.explosionParticles.size > 0)
      entities.set('explosionParticles', this.explosionParticles)

    entities.set('level', this.level)
    entities.set('score', this.score)

    return entities
  }

  endGame = ({stageWidth, stageHeight}) =>
  {
    const {asteroids, explosionParticles, remainingShips, saucer, saucerBullets, shipBullets, thrustParticles} = this
    const entities = new Map()
    const events = new Set()

    asteroids.forEach(asteroid => asteroid.update(stageWidth, stageHeight))
    explosionParticles.clear()
    remainingShips.clear()
    saucer.remove()
    saucerBullets.clear()
    shipBullets.clear()
    thrustParticles.clear()

    entities.set('asteroids', asteroids)
    entities.set('events', new Set([new Event(GAME_END)]))

    this.nextUpdateOperation = UPDATE_OPERATION.UPDATE_ASTEROIDS

    return entities
  }

  requestGameStart = () => this.nextUpdateOperation = UPDATE_OPERATION.START_GAME

  createNewLevelAsteroids = (level, ship, stageWidth, stageHeight) =>
  {
    const count = (level - 1) + NEW_GAME_ASTEROID_COUNT
    const shipX = ship ? ship.x : stageWidth / 2
    const shipY = ship ? ship.y : stageHeight / 2
    let index = 0

    this.asteroids = new Set()

    while (index++ < count)
      this.asteroids.add(new Asteroid(
        randomNumberBetweenExcluding(0, stageWidth, shipX - NEW_ASTEROID_SHIP_OFFSET, shipX + NEW_ASTEROID_SHIP_OFFSET),
        randomNumberBetweenExcluding(0, stageHeight, shipY - NEW_ASTEROID_SHIP_OFFSET, shipY + NEW_ASTEROID_SHIP_OFFSET),
        ASTEROID_SIZES[0]
      ))
  }

  createRemainingShips = () =>
  {
    let index = 0

    while (index < INITIAL_SHIPS_COUNT)
    {
      this.remainingShips.add({
        id: `remaining-ship_${index}`,
        x: REMAINING_SHIPS_POSITION.x + (REMAINING_SHIP_SPACING * index),
        y: REMAINING_SHIPS_POSITION.y,
        rotation: 180,
        vertices: SHIP_VERTICES.map(vertex => ({x: vertex.x * REMAINING_SHIP_SCALE, y: vertex.y * REMAINING_SHIP_SCALE}))
      })

      index++
    }
  }
}
