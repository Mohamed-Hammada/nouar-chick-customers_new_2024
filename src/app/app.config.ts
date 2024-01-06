import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions(),withComponentInputBinding()), 
    provideClientHydration(), 
    provideAnimations(), 
    { provide: Document, useExisting: DOCUMENT }]
};
