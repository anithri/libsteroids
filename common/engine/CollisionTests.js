import Asteroid, {SIZES as ASTEROID_SIZES} from './Asteroid'
import {doPolygonsIntersect, isPointInPolygon} from './Math'

const MINIMUM_ASTEROID_HIT_POINTS = 20
const LARGE_SAUCER_HIT_POINTS = 100
const SMALL_SAUCER_HIT_POINTS = 200

export default class CollisionTests
{
  points = 0

  constructor(asteroids, saucer, saucerBullets, ship, shipBullets)
  {
    asteroids.forEach(asteroid =>
    {
      const {hitArea} = asteroid

      if (!ship.spawning
      && doPolygonsIntersect(ship.hitArea, hitArea))
      {
        asteroid.destroy()
        ship.destroy()
      }

      if (shipBullets.size > 0)
        shipBullets.forEach(shipBullet =>
        {
          if (isPointInPolygon(shipBullet, hitArea))
          {
            asteroid.destroy()
            shipBullet.remove()

            this.points += (ASTEROID_SIZES.indexOf(asteroid.radius) + 1) * MINIMUM_ASTEROID_HIT_POINTS
          }
        })

      if (saucer.active)
      {
        if (doPolygonsIntersect(saucer.hitArea, hitArea))
        {
          asteroid.destroy()
          saucer.destroy()
        }

        if (saucerBullets.size > 0)
          saucerBullets.forEach(saucerBullet =>
          {
            if (isPointInPolygon(saucerBullet, hitArea))
            {
              asteroid.destroy()
              saucerBullet.remove()
            }
          })
      }
    })

    if (saucer.active)
    {
      const {hitArea} = saucer

      if (shipBullets.size > 0)
        shipBullets.forEach(shipBullet =>
        {
          if (isPointInPolygon(shipBullet, hitArea))
          {
            saucer.destroy()
            shipBullet.remove()
            this.points += saucer.scale === 1 ? LARGE_SAUCER_HIT_POINTS : SMALL_SAUCER_HIT_POINTS
          }
        })

      if (!ship.spawning)
      {
        if (doPolygonsIntersect(ship.hitArea, hitArea))
        {
          saucer.destroy()
          ship.destroy()
        }

        if (saucerBullets.size > 0)
          saucerBullets.forEach(saucerBullet =>
          {
            if (isPointInPolygon(saucerBullet, ship.hitArea))
            {
              saucerBullet.remove()
              ship.destroy()
            }
          })
      }
    }
  }
}
