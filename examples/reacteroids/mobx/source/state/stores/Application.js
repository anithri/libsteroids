import MobX, {action, observable} from 'mobx'
import {RENDERER, SCREEN} from 'constants'

export default class Application
{
  @observable highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : []

  @observable renderer = RENDERER.SVG

  @observable screen = SCREEN.MAIN_MENU

  @observable username = ''

  @action setHighScores = highScores =>
  {
    localStorage.setItem('highScores', JSON.stringify(highScores))
    this.highScores.replace(highScores)
  }

  @action setRenderer = renderer => this.renderer = renderer

  @action setScreen = screen => this.screen = screen

  @action setUsername = username => this.username = username
}
