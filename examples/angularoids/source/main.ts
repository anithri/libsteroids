import 'reflect-metadata'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'zone.js/dist/zone'
import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {AppModule} from 'AppModule'

if (PRODUCTION)
  enableProdMode()

document.title = 'Angularoids'
document.body.appendChild(document.createElement('angularoids'))

platformBrowserDynamic().bootstrapModule(AppModule)
