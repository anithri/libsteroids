const ACTION = {
  SET_HIGH_SCORES: 'SET_HIGH_SCORES',
  SET_RENDERER: 'SET_RENDERER',
  SET_SCREEN: 'SET_SCREEN',
  SET_USERNAME: 'SET_USERNAME'
}

const RENDERER = {
  SVG: 'SVG',
  PIXI_CANVAS: 'PIXI_CANVAS',
  PIXI_WEBGL: 'PIXI_WEBGL',
  THREE: 'THREE'
}

const SCREEN = {
  MAIN_MENU: 'MAIN_MENU',
  GAME: 'GAME',
  HIGH_SCORES: 'HIGH_SCORES'
}

const initialState = {
  highScores: localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : [],
  renderer: RENDERER.SVG,
  screen: SCREEN.MAIN_MENU,
  username: ''
}

const reducer = (state = initialState, action) =>
{
  switch (action.type)
  {
    case ACTION.SET_HIGH_SCORES:
      return {...state, highScores: [...action.highScores]}

    case ACTION.SET_RENDERER:
      return {...state, renderer: action.renderer}

    case ACTION.SET_SCREEN:
      return {...state, screen: action.screen}

    case ACTION.SET_USERNAME:
      return {...state, username: action.username}

    default:
      return state
  }
}

const setHighScores = highScores =>
{
  localStorage.setItem('highScores', JSON.stringify(highScores))

  return {type: ACTION.SET_HIGH_SCORES, highScores}
}

const setRenderer = renderer => ({type: ACTION.SET_RENDERER, renderer})

const setUsername = username => ({type: ACTION.SET_USERNAME, username})

const showGame = () => ({type: ACTION.SET_SCREEN, screen: SCREEN.GAME})

const showHighScores = () => ({type: ACTION.SET_SCREEN, screen: SCREEN.HIGH_SCORES})

const showMainMenu = () => ({type: ACTION.SET_SCREEN, screen: SCREEN.MAIN_MENU})

export {RENDERER, SCREEN, setHighScores, setRenderer, setUsername, showGame, showHighScores, showMainMenu, reducer}
