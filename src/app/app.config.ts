import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // Añadimos withHashLocation() aquí dentro
    provideRouter(routes, withHashLocation()), 
    provideAnimationsAsync()
  ]
};