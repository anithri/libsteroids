class Event
{
  constructor(type)
  {
    this.type = type
  }
}

export const GameStart = new Event('GameStart')

export const ShipSpawn = new Event('ShipSpawn')

export const ShipThrustStart = new Event('ShipThrustStart')

export const ShipThrustStop = new Event('ShipThrustStop')

export const SaucerLargeSpawn = new Event('SaucerLargeSpawn')

export const SaucerSmallSpawn = new Event('SaucerSmallSpawn')

export const SaucerRemoved = new Event('SaucerRemoved')

export const Shot = new Event('Shot')

export const ExplosionLarge = new Event('ExplosionLarge')

export const ExplosionMedium = new Event('ExplosionMedium')

export const ExplosionSmall = new Event('ExplosionSmall')

export const NewLevel = new Event('NewLevel')

export const GameEnd = new Event('GameEnd')

export {Event as Class}
