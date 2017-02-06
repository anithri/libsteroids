import {RENDERER, SCREEN} from 'constants'

export const SET_HIGH_SCORES = 'SET_HIGH_SCORES'

export const SET_RENDERER = 'SET_RENDERER'

export const SET_SCREEN = 'SET_SCREEN'

export const SET_USERNAME = 'SET_USERNAME'

export const setHighScores = highScores =>
{
  localStorage.setItem('highScores', JSON.stringify(highScores))

  return {type: SET_HIGH_SCORES, highScores}
}

export const setRenderer = renderer => ({type: SET_RENDERER, renderer})

export const setUsername = username => ({type: SET_USERNAME, username})

export const showGame = () => ({type: SET_SCREEN, screen: SCREEN.GAME})

export const showHighScores = () => ({type: SET_SCREEN, screen: SCREEN.HIGH_SCORES})

export const showMainMenu = () => ({type: SET_SCREEN, screen: SCREEN.MAIN_MENU})
