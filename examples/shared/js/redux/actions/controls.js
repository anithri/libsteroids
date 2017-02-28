export const Action = {
  SetAccelerating: 'SetAccelerating',
  SetHyperspace: 'SetHyperspace',
  SetRotatingLeft: 'SetRotatingLeft',
  SetRotatingRight: 'SetRotatingRight',
  SetShooting: 'SetShooting'
}

export function setAccelerating(accelerating)
{
  return {type: Action.SetAccelerating, accelerating}
}

export function setHyperspace(hyperspace)
{
  return {type: Action.SetHyperspace, hyperspace}
}

export function setRotatingLeft(rotatingLeft)
{
  return {type: Action.SetRotatingLeft, rotatingLeft}
}

export function setRotatingRight(rotatingRight)
{
  return {type: Action.SetRotatingRight, rotatingRight}
}

export function setShooting(shooting)
{
  return {type: Action.SetShooting, shooting}
}
