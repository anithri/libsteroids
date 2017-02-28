import {Injectable} from '@angular/core'
import {Effect, Actions} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {Event} from 'libsteroids-engine'
import {ApplicationAction, ApplicationActionType, EngineAction, EngineActionType, SetHighScoresAction, SetScreenAction, SetUsernameAction} from 'actions'
import {Screen} from 'actions/application'
import {EngineUpdate, HighScore, State} from 'interfaces'

const GAME_OVER_PAUSE:number = 2000

const gameEndEventType:string = Event.GameEnd.type

@Injectable()
export class ApplicationEffects
{
  constructor(private actions:Actions, private store:Store<State>) {}

  @Effect({dispatch: false})
  receiveEngineUpdate = this.actions.ofType(EngineActionType.ReceiveEngineUpdate).map((action:EngineAction) =>
  {
    if (action.update.events
    && action.update.events.includes(gameEndEventType))
    {
      this.store.dispatch(new SetScreenAction(Screen.GameOver))

      setTimeout(() =>
      {
        this.store.first().subscribe((state:State) =>
        {
          const highScores:HighScore[] = state.application.highScores
          const score:number = state.game.score

          if (score === 0
          || (highScores.length === 10
          && score < highScores[9].score))
            return this.store.dispatch(new SetScreenAction(Screen.HighScores))

          this.store.dispatch(new SetScreenAction(Screen.SaveScore))
        })

      }, GAME_OVER_PAUSE)
    }

    return null
  })

  @Effect()
  saveScore = this.actions.ofType(ApplicationActionType.SaveScore).map((action:ApplicationAction) =>
  {
    const username = action.username.toUpperCase()
    let highScores:HighScore[]
    let score:number

    this.store.first().subscribe((state:State) =>
    {
      highScores = [...state.application.highScores]
      score = state.game.score
    })

    highScores.push({username, score})
    highScores.sort((a, b) => b.score - a.score)

    if (highScores.length > 10)
      highScores = highScores.slice(0, 10)

    this.store.dispatch(new SetHighScoresAction(highScores))
    this.store.dispatch(new SetUsernameAction(username))

    return new SetScreenAction(Screen.HighScores)
  })
}
