import {Injectable} from '@angular/core'
import {Effect, Actions} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {Event} from 'libsteroids-engine'
import {EngineAction, EngineActionType, SetAcceleratingAction, SetHyperspaceAction, SetRotatingLeftAction, SetRotatingRightAction, SetShootingAction} from 'actions'
import {State} from 'interfaces'

const gameEndEventType:string = Event.GameEnd.type

@Injectable()
export class ControlsEffects
{
  constructor(private actions:Actions, private store:Store<State>) {}

  @Effect({dispatch: false})
  receiveEngineUpdate = this.actions.ofType(EngineActionType.ReceiveEngineUpdate).map((action:EngineAction) =>
  {
    this.store.first().subscribe((state:State) =>
    {
      if (state.controls.hyperspace)
        this.store.dispatch(new SetHyperspaceAction(false))

      if (action.update.events
      && action.update.events.includes(gameEndEventType))
      {
        const {accelerating, rotatingLeft, rotatingRight, shooting} = state.controls

        if (accelerating)
          this.store.dispatch(new SetAcceleratingAction(false))

        if (rotatingLeft)
          this.store.dispatch(new SetRotatingLeftAction(false))

        if (rotatingRight)
          this.store.dispatch(new SetRotatingRightAction(false))

        if (shooting)
          this.store.dispatch(new SetShootingAction(false))
      }
    })

    return null
  })
}
