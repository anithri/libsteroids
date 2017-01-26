export const GAME_START = 'GAME_START'

export const GAME_END = 'GAME_END'

export const NEW_LEVEL = 'NEW_LEVEL'

export const SHIP_SPAWN = 'SHIP_SPAWN'

export const SHIP_THRUST_START = 'SHIP_THRUST_START'

export const SHIP_THRUST_STOP = 'SHIP_THRUST_STOP'

export const SAUCER_LARGE_SPAWN = 'SAUCER_LARGE_SPAWN'

export const SAUCER_SMALL_SPAWN = 'SAUCER_SMALL_SPAWN'

export const SAUCER_REMOVED = 'SAUCER_REMOVED'

export const SHOT = 'SHOT'

export const EXPLOSION_LARGE = 'EXPLOSION_LARGE'

export const EXPLOSION_MEDIUM = 'EXPLOSION_MEDIUM'

export const EXPLOSION_SMALL = 'EXPLOSION_SMALL'

export default class Event
{
  constructor(type)
  {
    this.type = type
  }
}
