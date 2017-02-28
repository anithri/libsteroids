export const Action = {
  SetEvents: 'SetEvents',
  SetLevel: 'SetLevel',
  SetScore: 'SetScore'
}

export function setEvents(events)
{
  return {type: Action.SetEvents, events}
}

export function setLevel(level)
{
  return {type: Action.SetLevel, level}
}

export function setScore(score)
{
  return {type: Action.SetScore, score}
}
