import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {EffectsModule} from '@ngrx/effects'
import {Store, StoreModule} from '@ngrx/store'
import {Angularoids, HighScores, GameOver, HUD, MainMenu, RendererCanvas, RendererPixi, RendererSVG, RendererThree, SaveScore} from 'components'
import {Controls, Sounds} from 'directives'
import {ApplicationEffects, ControlsEffects, EngineEffects, GameEffects, StageEffects} from 'effects'
import {EngineService} from 'services'
import {reducer} from 'reducers'

@NgModule({
  bootstrap: [Angularoids],
  declarations: [Angularoids, Controls, GameOver, HighScores, HUD, MainMenu, RendererCanvas, RendererPixi, RendererSVG, RendererThree, SaveScore, Sounds],
  imports: [BrowserModule, EffectsModule.run(ApplicationEffects), EffectsModule.run(ControlsEffects), EffectsModule.run(EngineEffects), EffectsModule.run(GameEffects), EffectsModule.run(StageEffects), FormsModule, StoreModule.provideStore(reducer)],
  providers: [EngineService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
