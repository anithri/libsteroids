export const Action = {
  SetHighScores: 'SetHighScores',
  SetRenderer: 'SetRenderer',
  SetScreen: 'SetScreen',
  SetUsername: 'SetUsername'
}

export function setHighScores(highScores)
{
  localStorage.setItem('highScores', JSON.stringify(highScores))

  return {type: Action.SetHighScores, highScores}
}

export function setRenderer(renderer)
{
  return {type: Action.SetRenderer, renderer}
}

export function setScreen(screen)
{
  return {type: Action.SetScreen, screen}
}

export function setUsername(username)
{
  return {type: Action.SetUsername, username}
}
