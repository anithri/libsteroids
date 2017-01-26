import Bullet from './Bullet'
import {randomNumberBetween} from './Math'

const SPEED = 8
let __index = 0

export default class SaucerBullet extends Bullet
{
  static index = 0

  constructor(saucer, ship, stageWidth, stageHeight)
  {
    const distance = {x: ship.x - saucer.x, y: ship.y - saucer.y}
    const range = Math.min(stageWidth, stageHeight) * 0.5
    const lifespan = Math.round(range / SPEED)
    const velocity = {}

    if (Math.abs(distance.x) > Math.abs(distance.y))
    {
      velocity.x = distance.x > 0 ? SPEED : -SPEED
      velocity.y = (velocity.x * distance.y) / distance.x
    }

    else
    {
      velocity.y = distance.y > 0 ? SPEED : -SPEED
      velocity.x = (velocity.y * distance.x) / distance.y
    }

    const x = saucer.x + (velocity.x * 4)
    const y = saucer.y + (velocity.y * 4)

    super(`saucer-bullet_${__index++}`, x, y, velocity, lifespan)
  }
}
