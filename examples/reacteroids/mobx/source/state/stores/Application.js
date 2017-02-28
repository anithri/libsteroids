import MobX, {action, observable} from 'mobx'
import {Renderer, Screen} from 'constants'

export default class Application
{
  @observable
  highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : []

  @observable
  renderer = Renderer.SVG

  @observable
  screen = Screen.MainMenu

  @observable
  username = ''

  @action
  setHighScores(highScores)
  {
    localStorage.setItem('highScores', JSON.stringify(highScores))

    this.highScores.replace(highScores)
  }

  @action
  setRenderer = renderer => this.renderer = renderer

  @action
  setScreen(screen)
  {
    this.screen = screen
  }

  @action
  setUsername(username)
  {
    this.username = username
  }
}
