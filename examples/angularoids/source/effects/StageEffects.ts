import {Injectable} from '@angular/core'
import {Effect, Actions} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {EngineAction, EngineActionType, SetParticlesAction, SetPolygonsAction} from 'actions'
import {EngineUpdate, Particle, Polygon, StageState, State} from 'interfaces'

@Injectable()
export class StageEffects
{
  constructor(private actions:Actions, private store:Store<State>) {}

  @Effect({dispatch: false})
  receiveEngineUpdate = this.actions.ofType(EngineActionType.ReceiveEngineUpdate).map((action:EngineAction) =>
  {
    const update:EngineUpdate = action.update

    this.store.select('stage').first().subscribe((state:StageState) =>
    {
      if (update.particles
      && update.particles.length > 0)
        this.store.dispatch(new SetParticlesAction(update.particles))

      else if (state.particles.length > 0)
        this.store.dispatch(new SetParticlesAction([]))

      if (update.polygons
      && update.polygons.length > 0)
        this.store.dispatch(new SetPolygonsAction(update.polygons))

      else if (state.polygons.length > 0)
        this.store.dispatch(new SetPolygonsAction([]))
    })

    return null
  })
}
