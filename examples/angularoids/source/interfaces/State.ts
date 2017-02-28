import {Renderer, Screen} from 'actions/application'
import {HighScore} from 'interfaces/HighScore'
import {Particle} from 'interfaces/Particle'
import {Polygon} from 'interfaces/Polygon'

export interface ApplicationState {
  highScores: HighScore[]
  renderer: Renderer
  screen: Screen
  username: string
}

export interface ControlsState {
  accelerating: boolean
  rotatingLeft: boolean
  rotatingRight: boolean
  shooting: boolean
  hyperspace: boolean
}

export interface GameState {
  events: string[]
  level: number
  score: number
}

export interface StageState
{
  width: number
  height: number
  particles: Particle[]
  polygons: Polygon[]
}

export interface State
{
  application: ApplicationState
  controls: ControlsState
  game: GameState
  stage: StageState
}

