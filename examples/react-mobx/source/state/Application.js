import MobX, {action, observable} from 'mobx'
import {addKeyListener} from 'input/Keyboard'

const KEY = {
  1: 49,
  2: 50,
  3: 51,
  4: 52
}

export const RENDERER = {
  SVG: 'SVG',
  PIXI_CANVAS: 'PIXI_CANVAS',
  PIXI_WEBGL: 'PIXI_WEBGL',
  THREE: 'THREE'
}

export const SCREEN = {
  MAIN_MENU: 'MAIN_MENU',
  GAME: 'GAME',
  HIGH_SCORES: 'HIGH_SCORES'
}

export default class Application
{
  @observable highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : []

  @observable renderer = RENDERER.SVG

  @observable screen = SCREEN.MAIN_MENU

  @observable username = ''

  constructor()
  {
    addKeyListener(KEY['1'], pressed => pressed && this.setRenderer(RENDERER.SVG))
    addKeyListener(KEY['2'], pressed => pressed && this.setRenderer(RENDERER.PIXI_CANVAS))
    addKeyListener(KEY['3'], pressed => pressed && this.setRenderer(RENDERER.PIXI_WEBGL))
    addKeyListener(KEY['4'], pressed => pressed && this.setRenderer(RENDERER.THREE))
  }

  @action setHighScores = highScores =>
  {
    localStorage.setItem('highScores', JSON.stringify(highScores))
    this.highScores.replace(highScores)
  }

  @action setRenderer = renderer => this.renderer = renderer

  @action setScreen = screen => this.screen = screen

  @action setUsername = username => this.username = username
}
