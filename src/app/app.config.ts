import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { DataState } from './worker/state/data.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(NgxsModule.forRoot([DataState]), NgxsReduxDevtoolsPluginModule.forRoot()),
    provideAnimations()
]
};
