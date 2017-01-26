const RADIUS = 2

export default class Bullet
{
  constructor(id, x, y, velocity, lifespan)
  {
    Object.assign(this, {id, x, y, velocity, lifespan, radius: RADIUS})
  }

  update = (stageWidth, stageHeight) =>
  {
    let {x, y, velocity} = this

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

    this.x = x
    this.y = y

    if (--this.lifespan <= 0)
      this.removed = true
  }

  remove = () => this.removed = true
}
