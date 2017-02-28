import {Injectable} from '@angular/core'
import {Effect, Actions} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Observable'
import Stats from 'stats.js'
import {ApplicationAction, ApplicationActionType, GameActionType, EngineActionType, RequestEngineUpdateAction, ReceiveEngineUpdateAction} from 'actions'
import {Screen} from 'actions/application'
import {ControlsState, EngineUpdate, State} from 'interfaces'
import {EngineService} from 'services'

@Injectable()
export class EngineEffects
{
  private stats:Stats

  constructor(private actions:Actions, private engineService:EngineService, private store:Store<State>)
  {
    if (DEVELOPMENT)
    {
      this.stats = new Stats()
      Object.assign(this.stats.dom.style, {top:'unset', bottom: 0})
      document.body.appendChild(this.stats.dom)
    }

    store.dispatch(new RequestEngineUpdateAction())
  }

  @Effect({dispatch:false})
  startGame = this.actions.ofType(ApplicationActionType.SetScreen).map((action:ApplicationAction) =>
  {
    if (action.screen === Screen.Game)
      this.engineService.startGame()

    return null
  })

  @Effect()
  requestEngineUpdate = this.actions.ofType(EngineActionType.RequestEngineUpdate).switchMap(() =>
  {
    let width:number
    let height:number
    let controls:ControlsState

    this.store.first().subscribe((state:State) =>
    {
      width = state.stage.width
      height = state.stage.height
      controls = state.controls
    })

    if (DEVELOPMENT)
      this.stats.begin()

    return Observable.fromPromise(this.engineService.update(width, height, controls)).map((update:EngineUpdate) => new ReceiveEngineUpdateAction(update))
  })

  @Effect({dispatch:false})
  receiveEngineUpdate = this.actions.ofType(EngineActionType.ReceiveEngineUpdate).map(() =>
  {
    if (DEVELOPMENT)
      this.stats.end()

    requestAnimationFrame(() => this.store.dispatch(new RequestEngineUpdateAction()))

    return null
  })
}
