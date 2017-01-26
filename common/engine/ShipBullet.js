import Bullet from './Bullet'
import {rotatePoint} from './Math'

const SHIP_OFFSET_Y = 20
const SPEED = 12
let __index = 0

export default class ShipBullet extends Bullet
{
  constructor(ship, stageWidth, stageHeight)
  {
    const offset = rotatePoint({x:0, y:SHIP_OFFSET_Y}, {x:0, y:0}, ship.rotation * Math.PI / 180)
    const range = Math.min(stageWidth, stageHeight) * 0.75
    const lifespan = Math.round(range / SPEED)
    const x = ship.x + offset.x
    const y = ship.y + offset.y
    const velocity = {}

    if (Math.abs(offset.x) > Math.abs(offset.y))
    {
      velocity.x = offset.x > 0 ? SPEED : -SPEED
      velocity.y = (velocity.x * offset.y) / offset.x
    }

    else
    {
      velocity.y = offset.y > 0 ? SPEED : -SPEED
      velocity.x = (velocity.y * offset.x) / offset.y
    }

    if ((velocity.x > 0
    && ship.velocity.x > 0)
    || (velocity.x < 0
    && ship.velocity.x < 0))
      velocity.x += ship.velocity.x

    if ((velocity.y > 0
    && ship.velocity.y > 0)
    || (velocity.y < 0
    && ship.velocity.y < 0))
      velocity.y += ship.velocity.y

    super(`ship-bullet_${__index++}`, x, y, velocity, lifespan)
  }
}
