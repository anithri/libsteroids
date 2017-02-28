import {Injectable} from '@angular/core'
import {Effect, Actions} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {EngineAction, EngineActionType, SetEventsAction, SetLevelAction, SetScoreAction} from 'actions'
import {EngineUpdate, State} from 'interfaces'

@Injectable()
export class GameEffects
{
  constructor(private actions:Actions, private store:Store<State>) {}

  @Effect({dispatch: false})
  receiveEngineUpdate = this.actions.ofType(EngineActionType.ReceiveEngineUpdate).map((action:EngineAction) =>
  {
    const update:EngineUpdate = action.update

    if (update.events
    || update.level
    || update.score)
    {
      if (update.events
      && update.events.length > 0)
      {
        this.store.dispatch(new SetEventsAction(update.events))
        this.store.dispatch(new SetEventsAction([]))
      }

      if (update.level)
        this.store.dispatch(new SetLevelAction(update.level))

      if (update.score !== undefined)
        this.store.dispatch(new SetScoreAction(update.score))
    }

    return null
  })
}
