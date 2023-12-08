import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideRouter(routes),
    provideAnimations()
  ]
};
