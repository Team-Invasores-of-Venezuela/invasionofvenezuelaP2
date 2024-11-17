import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {routes} from './app/app.routes';
import {provideRouter} from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), // Importa HttpClientModule aquí
  ],
}).catch((err) => console.error(err));
