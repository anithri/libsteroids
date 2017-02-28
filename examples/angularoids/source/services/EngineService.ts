import {Injectable} from '@angular/core'
import {ControlsState, EngineUpdate} from 'interfaces'

const EngineWorker = require('worker-loader?inline!libsteroids-examples-shared/js/EngineWorker.js')

@Injectable()
export class EngineService
{
  engine = new EngineWorker()

  startGame()
  {
    this.engine.postMessage(JSON.stringify({action: 'startGame'}))
  }

  update(stageWidth:number, stageHeight:number, controls:ControlsState)
  {
    return new Promise<EngineUpdate>((resolve:Function) =>
    {
      this.engine.postMessage(JSON.stringify({action: 'update', stageWidth, stageHeight, controls}))
      this.engine.onmessage = (message:MessageEvent) => resolve(JSON.parse(message.data))
    })
  }
}
